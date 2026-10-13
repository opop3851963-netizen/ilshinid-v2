import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'resend-email-api',
        configureServer(server) {
          server.middlewares.use('/api/send-email', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';

                const emailHtml = `
                  <div style="font-family: sans-serif; padding: 24px; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
                    <h2 style="color: #0b192c; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; margin-top: 0;">
                      [(주)일신아이디] 온라인 견적/문의가 접수되었습니다.
                    </h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
                      <tr>
                        <td style="padding: 10px; font-weight: bold; width: 120px; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">성함/담당자</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.name || '-'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; font-weight: bold; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">연락처</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.phone || '-'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; font-weight: bold; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">공사 구분</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.category || '-'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; font-weight: bold; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">상세 문의내용</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; white-space: pre-wrap;">${data.message || '-'}</td>
                      </tr>
                    </table>
                    <p style="margin-top: 24px; font-size: 12px; color: #64748b; line-height: 1.5;">
                      ※ 본 메일은 (주)일신아이디 웹사이트 온라인 문의 폼에서 Resend API를 통해 수신되었습니다.
                    </p>
                  </div>
                `;

                const response = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    from: '일신아이디 <onboarding@resend.dev>',
                    to: ['opop3851963@gmail.com'],
                    subject: `[(주)일신아이디 견적문의] ${data.name}님의 ${data.category} 상담 신청`,
                    html: emailHtml
                  })
                });

                const result = await response.json();
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = response.ok ? 200 : response.status;
                res.end(JSON.stringify(result));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          });
        }
      }
    ],
  };
});
