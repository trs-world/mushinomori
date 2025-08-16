import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 入力値の検証
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール設定（Yahoo Mail SMTPを使用）
    const transporter = nodemailer.createTransporter({
      host: 'smtp.mail.yahoo.co.jp',
      port: 587,
      secure: false,
      auth: {
        user: process.env.YAHOO_USER,
        pass: process.env.YAHOO_APP_PASSWORD,
      },
    });

    // メール内容
    const mailOptions = {
      from: process.env.YAHOO_USER,
      to: 'trs1141@yahoo.co.jp',
      subject: `【虫の森.com】お問い合わせ: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px;">
            虫の森.com お問い合わせ
          </h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #065f46; margin-top: 0;">お問い合わせ内容</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #374151; width: 120px;">お名前:</td>
                <td style="padding: 8px; color: #374151;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #374151;">メールアドレス:</td>
                <td style="padding: 8px; color: #374151;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #374151;">お問い合わせ種別:</td>
                <td style="padding: 8px; color: #374151;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #d1d5db; border-radius: 8px;">
            <h4 style="color: #374151; margin-top: 0;">お問い合わせ内容:</h4>
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>送信日時:</strong> ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
            </p>
          </div>
        </div>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'お問い合わせを送信しました' },
      { status: 200 }
    );

  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
}
