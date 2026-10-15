export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const apiKey = process.env.RESEND_API_KEY || '';

    if (!apiKey) {
      return res.status(500).json({ error: 'RESEND_API_KEY is not configured in Vercel' });
    }

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
            <td style="padding: 10px; font-weight: bold; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">예산</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.budget || '미정/협의'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">현장 주소</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${data.address || '-'}</td>
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
    return res.status(response.ok ? 200 : response.status).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
