import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const photos = [
    "/image/01.png",
    "/image/02.png",
    "/image/03.png",
    "/image/04.png"
]

export function Memories() {
    return (
        <div className="w-full max-w-xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-pink-800 mb-6 drop-shadow-sm">
                📸
            </h2>
            <Carousel className="w-full">
                <CarouselContent>
                    {photos.map((src, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="border-4 border-white shadow-xl rotate-1 hover:rotate-0 transition-transform duration-300 bg-pink-50">
                                    <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden rounded-lg">
                                        <img
                                            src={src}
                                            alt={`Memory ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white text-pink-600 border-pink-200" aria-label="Previous slide" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white text-pink-600 border-pink-200" aria-label="Next slide" />
            </Carousel>
            {/* <p className="text-center text-pink-500 text-sm mt-4 italic">เลื่อนดูรูปน่ารักๆ ของเรา 👇</p> */}
        </div>
    )
}
