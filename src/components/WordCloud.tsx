// src/components/WordCloud.tsx
import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const words = [
  { text: 'Flutter', value: 500 },
  { text: 'Django', value: 300 },
  { text: 'Bootstrap', value: 100 },
  { text: 'Flask API', value: 100 },
  { text: 'JavaScript', value: 400 },
  { text: 'Typescript', value: 300 },
  { text: 'React.js', value: 600 },
  { text: 'Docker', value: 100 },
  { text: 'AWS', value: 100 },
  { text: 'Automated Tests', value: 200 },
  { text: 'Selenium', value: 300 },
  { text: 'SQL', value: 100 },
  { text: 'Tesseract OCR', value: 300 },
  { text: 'Git', value: 100 },
  { text: 'Github', value: 200 },
];

const WordCloudComponent = () => {
  const options: any = {
    colors: ['#F277A4', '#D966B1', '#84498C', '#021F59', '#011640'],
    enableTooltip: false,
    deterministic: false,
    fontFamily: 'Roboto Condensed',
    fontSizes: [30, 60, 100, 180],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 5],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return <ReactWordcloud words={words} options={options} />;
};

export default WordCloudComponent;