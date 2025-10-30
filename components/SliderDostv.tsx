"use client"

import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styles from './index.module.css'
import Link from 'next/link';

import Slider from "react-slick";
import ReactPlayer from "react-player";
import { ReactPlayerProps } from 'react-player/types';


interface ReactPlayerAddOn extends ReactPlayerProps {
    url:string;
}

interface Video {
    id?: number;
    title?: string;
    description?: string;
    link: string;
}

interface DostvData {
    dostv: {
        title: string;
        description: string;
        featured_image: string;
        website: string;
        link: string;
    };

    videos: Video[]
}


export default function SliderDostv ( { data } : { data:DostvData } ) {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        adaptiveHeight: true,
        autoplaySpeed: 3000
    }


    return (
      <Slider
            className=""
            {...settings}>
            {data?.videos.map((video:Video) => (
                <div key={video.id} className=''>
                    <ReactPlayer
                        className='mx-2'
                    {...({
                        url: video.link,
                        controls: true,
                        width: "100%",
                        height: "240px",
                        style: {
                        borderRadius: "0.5rem",
                        overflow: "hidden",
                        maxWidth: "360px",
                        margin: "0 auto",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        },
                    } as ReactPlayerAddOn)}
                    />
                </div>
            ))}
        </Slider>
    )
}
