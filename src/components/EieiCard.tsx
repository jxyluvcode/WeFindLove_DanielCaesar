import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent } from '@/components/ui/card';
import { Memories } from "@/components/Memories";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const CORRECT_PIN = '031266'; // 6-digit PIN (03/12/66)
const START_DATE = new Date('2023-12-03T00:00:00+07:00');
const SADMODE = true

function diffYearMonthDay(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export default function ValentineCard() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const now = useNow(1000);

  useEffect(() => {
    if (unlocked) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [unlocked]);

  const duration = useMemo(() => {
    const ms = now.getTime() - START_DATE.getTime();
    const ymd = diffYearMonthDay(START_DATE, now);

    return {
      ...ymd,
      totalDays: Math.floor(ms / (1000 * 60 * 60 * 24)),
      totalHours: Math.floor(ms / (1000 * 60 * 60)),
      totalMinutes: Math.floor(ms / (1000 * 60)),
      totalSeconds: Math.floor(ms / 1000)
    };
  }, [now]);

  const unlock = () => {
    if (isLoading) return;

    if (!/^\d{6}$/.test(pin.trim())) {
      setError('กรุณาใส่ PIN ตัวเลข 6 หลัก');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (pin === CORRECT_PIN) {
        setUnlocked(true);
        setIsLoading(false);
      } else {
        setError('PIN ไม่ถูกต้อง ลองใหม่อีกครั้ง 💔');
        setIsLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    if (pin.length === 6) {
      unlock();
    }
  }, [pin]);

  return (
    <main className="mx-auto w-full max-w-xl px-2 sm:px-4 py-8 overflow-hidden relative">
      <div className="absolute top-10 left-10 text-pink-200 animate-bounce opacity-50" aria-hidden="true"><Heart size={40} fill="currentColor" /></div>
      <div className="absolute bottom-20 right-10 text-pink-200 animate-pulse opacity-50" aria-hidden="true"><Heart size={30} fill="currentColor" /></div>
      <div className="absolute top-1/2 right-1/4 text-pink-100 animate-bounce opacity-30 delay-700" aria-hidden="true"><Sparkles size={24} /></div>

      <Card className="border-pink-200 shadow-xl shadow-pink-100/50 transition-all hover:shadow-2xl hover:shadow-pink-200/50 duration-500">
        <CardContent className="p-4 sm:p-8 space-y-4 sm:space-y-6 text-pink-900">
          {!unlocked ? (
            <section className="space-y-4 text-center animate-in fade-in zoom-in duration-500">
              <p className="text-4xl sm:text-6xl animate-bounce">💌</p>
              <h1 className="text-2xl sm:text-4xl font-black bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                Valentine Card
              </h1>
              <p className="text-pink-700 text-sm sm:text-base px-4">{SADMODE == true ? "ทำให้ใครหล่ะครับ" : "ใส่ PIN 6 หลักเพื่อดูระยะเวลาที่เรารักกัน"}</p>

              <div className="space-y-4 mt-4 transition-all">


                <div className="flex justify-center scale-90 sm:scale-100">
                  <InputOTP maxLength={6} value={pin} onChange={setPin} onKeyDown={(event) => event.key === 'Enter' && unlock()} aria-label="กรุณาใส่รหัส PIN 6 หลัก" disabled={SADMODE}>
                    <InputOTPGroup aria->
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>


                <Button
                  className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-pink-400/50 transition-all hover:scale-[1.02] active:scale-95 py-6 text-lg sm:text-xl font-bold"
                  size="lg"
                  onClick={unlock}
                  disabled={SADMODE}
                >
                  {isLoading ? <Spinner className="mr-2" /> : <Heart className="mr-2 fill-current" />}
                  {SADMODE === true ? "ปิดใจครับ :)" : "ปลดล็อกหัวใจ"}
                </Button>
                <p className="h-5 text-sm font-medium text-rose-600" role="alert" aria-live="polite">{error}</p>
              </div>

              <p className="text-sm sm:text-sm text-pink-500 italic">{SADMODE == true ? "พอครับ" : "คำใบ้: วันที่เริ่มรักกัน (พ.ศ.)"}</p>
            </section>
          ) : (
            <section className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex justify-center space-x-2">
                <Heart className="text-rose-500 animate-pulse fill-current" />
                <h2 className="text-2xl sm:text-3xl font-black text-rose-600"> ❤️</h2>
                <Heart className="text-rose-500 animate-pulse fill-current" />
              </div>

              <p className="text-pink-700 sm:text-lg">
                เริ่มรักกันวันที่ <span className="underline decoration-pink-300 decoration-2 underline-offset-4 font-bold text-pink-800">03 ธันวาคม 2566</span>
              </p>

              <div className="rounded-3xl bg-linear-to-br from-pink-50 to-rose-100 p-6 sm:p-8 border border-white shadow-inner">
                <p className="text-pink-600 font-medium mb-1 truncate">ครบรอบ</p>
                <p className="text-2xl sm:text-4xl font-black text-pink-900 tracking-tight">
                  {duration.years} ปี {duration.months} เดือน {duration.days} วัน
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/60 p-4 border border-pink-100 hover:border-pink-300 transition-colors shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-pink-700">{duration.totalDays.toLocaleString('th-TH')}</p>
                  <p className="text-xs sm:text-sm font-bold text-pink-400 uppercase tracking-widest">วัน</p>
                </div>
                <div className="rounded-2xl bg-white/60 p-4 border border-pink-100 hover:border-pink-300 transition-colors shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-pink-700">{duration.totalHours.toLocaleString('th-TH')}</p>
                  <p className="text-xs sm:text-sm font-bold text-pink-400 uppercase tracking-widest">ชั่วโมง</p>
                </div>
                <div className="rounded-2xl bg-white/60 p-4 border border-pink-100 hover:border-pink-300 transition-colors shadow-sm">
                  <p className="text-2xl sm:text-3xl font-black text-pink-700">{duration.totalMinutes.toLocaleString('th-TH')}</p>
                  <p className="text-xs sm:text-sm font-bold text-pink-400 uppercase tracking-widest">นาที</p>
                </div>
              </div>

              <p className="text-lg sm:text-xl font-bold bg-pink-100 inline-block px-4 py-1 rounded-full text-pink-600 shadow-sm">
                {duration.totalSeconds.toLocaleString('th-TH')} <span className="text-sm font-normal">วินาที</span>
              </p>
              <Memories />
            </section>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
