'use client';

import React, { useEffect, useState } from 'react';
import styles from './ExpertiseItem/styles.module.scss';
import Container from '@/UI/containers';
import { ExpertiseItem, ExpertiseItemData } from './ExpertiseItem';
import { ExpertiseListSkeleton } from './ExpertiseItem/ExpertiseItemSkeleton';
import { fetchAll } from '@/utils/supabase/client';
import { dbHelper } from '@/utils/supabase/helper';
import { Locales } from '@/i18n/config';

type Props = {
  locale: Locales;
};

const ExpertiseList = ({ locale }: Props) => {
  const [items, setItems] = useState<ExpertiseItemData[] | null>(null);

  useEffect(() => {
    fetchAll('services_section', { sortBy: 'display_order', ascending: true }).then((res) => {
      const mapped: ExpertiseItemData[] = res.map((row) => {
        const highlightStat = row[dbHelper.getHighlightStat(locale)];
        const tag = row[dbHelper.getTag(locale)];

        return {
          id: row.id,
          title: row[dbHelper.getTitle(locale)],
          description: row[dbHelper.getDescription(locale)],
          heroImage: row.image ?? undefined,
          benefits: highlightStat
            ? [{ value: highlightStat, label: tag }]
            : [],
          products: [],
          footerText: row[dbHelper.getInfo(locale)],
          ctaText: 'Contact Us',
        };
      });
      setItems(mapped);
    });
  }, [locale]);

  return (
    <div className={styles.expertise}>
      <Container>
        <div className={styles.expertise__inner}>
          {items === null ? (
            <ExpertiseListSkeleton />
          ) : (
            items.map((item) => (
              <ExpertiseItem key={item.id} data={item} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default ExpertiseList;
