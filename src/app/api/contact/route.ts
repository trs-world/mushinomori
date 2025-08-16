export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 入力値の検証
    if (!name || !email) {
      return NextResponse.json(
        { error: 'お名前とメールアドレスは必須です' },
        { status: 400 }
      );
    }

    // メール設定（Yahoo Mail SMTPを使用）
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.co.jp',
      port: 465,
      secure: true,
      auth: {
        user: process.env.YAHOO_USER,
        pass: process.env.YAHOO_PASS,
      },
    });

    // メール送信
    await transporter.sendMail({
      from: process.env.YAHOO_USER,
      to: 'trs1141@yahoo.co.jp',
      subject: subject || '【虫の森.com】お問い合わせ',
      text: `お名前: ${name}\nメール: ${email}\n題名: ${subject}\n\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('メール送信エラー:', error);
    
    return NextResponse.json({ error: 'メール送信に失敗しました。' }, { status: 500 });
  }
}
