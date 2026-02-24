import React from 'react';
import styles from './ExpertiseItem/styles.module.scss';
import Container from '@/UI/containers';
import { ExpertiseItem, ExpertiseItemData } from './ExpertiseItem';

const ExpertiseList = () => {
  // Mock data for demonstration - replace with actual data
  const expertiseData: ExpertiseItemData[] = [
    {
      id: '1',
      title: 'CCTV & Security Cameras',
      description:
        'From structured cabling to wireless systems, we build high-performance networks using trusted hardware brands for smooth and secure connectivity.',
      heroImage: '/images/expertise/cctv-hero.jpg',
      benefits: [
        { value: '+200', label: 'Cameras Installed' },
        { value: '+100', label: 'Government projects' },
      ],
      products: [
        { id: '1', image: '/images/products/camera-1.jpg' },
        { id: '2', image: '/images/products/camera-2.jpg' },
        { id: '3', image: '/images/products/camera-3.jpg' },
        { id: '4', image: '/images/products/camera-4.jpg' },
        { id: '5', image: '/images/products/camera-5.jpg' },
        { id: '6', image: '/images/products/camera-6.jpg' },
      ],
      footerText:
        'We serve projects in any complexity level from houses, personal placements to government building want to discuss more contact us',
      ctaText: 'Contact Us',
    },
    {
      id: '2',
      title: 'Professional Audio, Video & Lighting',
      description:
        'From structured cabling to wireless systems, we build high-performance networks using trusted hardware brands for smooth and secure connectivity.',
      heroImage: '/images/expertise/audio-hero.jpg',
      benefits: [
        { value: '+200', label: 'Cameras Installed' },
        { value: '+100', label: 'Government projects' },
      ],
      products: [
        { id: '1', image: '/images/products/audio-1.jpg' },
        { id: '2', image: '/images/products/audio-2.jpg' },
        { id: '3', image: '/images/products/audio-3.jpg' },
        { id: '4', image: '/images/products/audio-4.jpg' },
        { id: '5', image: '/images/products/audio-5.jpg' },
        { id: '6', image: '/images/products/audio-6.jpg' },
      ],
      footerText:
        'We serve projects in any complexity level from houses, personal placements to government building want to discuss more contact us',
      ctaText: 'Contact Us',
    },
  ];

  return (
    <div className={styles.expertise}>
      <Container>
        <div className={styles.expertise__inner}>
          {expertiseData.map((item) => (
            <ExpertiseItem key={item.id} data={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ExpertiseList;
