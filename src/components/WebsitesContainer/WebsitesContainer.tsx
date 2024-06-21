import React, { useEffect, useRef, useState } from 'react';
import './WebsitesContainer.css';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import copybaseBi from '../../assets/copybase-bi.png';
import jsonGenerator from '../../assets/json_generator.png';
import fanysHair from '../../assets/fanyshair.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WebsitesContainer: React.FC = () => {
    const { t } = useTranslation();
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkVisibility = () => {
        if (!hasAnimated && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            if (isVisible) {
                setHasAnimated(true);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        initialSlide: 0,
        centerMode: true,
        centerPadding: '0',
    };

    return (
        <div
            className={`websites-container ${hasAnimated ? 'fadeIn' : ''}`}
            ref={containerRef}
        >
            <div className="websites">
                <h1>{t('testWebsites')}</h1>
                <Slider {...settings}>
                    <div className="slide">
                        <a href='https://copybase-bi.vercel.app/' target='_blank'><img src={copybaseBi} alt="Copybase BI" /></a>
                        <div className="slide-description">{t('copybaseBi')}</div>
                    </div>

                    <div className="slide">
                        <a href='https://json-generator-brut4luk3.vercel.app/' target='_blank'><img src={jsonGenerator} alt="JSON Generator" /></a>
                        <div className="slide-description">{t('jsonGenerator')}</div>
                    </div>
                    <div className="slide">
                        <a href='https://fanys-hair.vercel.app/' target='_blank'><img src={fanysHair} alt="Fany's Hair" /></a>
                        <div className="slide-description">{t('fanysHair')}</div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default WebsitesContainer;