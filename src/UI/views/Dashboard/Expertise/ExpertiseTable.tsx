'use client';
import { ServiceSection } from '@/types/supabase';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, { ActionsCell, ActionsHeader, DashboardTableCta } from '../DashboardTable';
import Button from '@/UI/components/Button';

type ExpertiseWithID = ServiceSection & { index: number };
type Props = {
  data: ExpertiseWithID[] | null;
  onAdd: () => void;
  onEdit: (data: ServiceSection) => void;
};

const columns: TableColumn<ExpertiseWithID>[] = [
  {
    name: 'ID',
    selector: (row) => row.index,
    grow: 0,
    sortable: true,
    width: '60px',
  },
  {
    name: '#',
    selector: (row) => row.display_order ?? 0,
    sortable: true,
    grow: 0,
    width: '60px',
    cell: (row) => <span>{row.display_order ?? '—'}</span>,
  },
  {
    name: 'Image',
    grow: 0,
    cell: (row) =>
      row.image ? <ExpertiseImg src={row.image} alt={row.title_en} /> : <span>—</span>,
  },
  {
    name: 'Icon',
    grow: 0,
    cell: (row) =>
      row.image_icon ? (
        <ExpertiseImg src={row.image_icon} alt={row.title_en} />
      ) : (
        <span>—</span>
      ),
  },
  {
    name: 'Slug',
    selector: (row) => row.service_slug,
    sortable: true,
    grow: 0.3,
  },
  {
    name: 'Info En',
    grow: 0.55,
    selector: (row) => row.title_en,
    cell: (row) => (
      <InfoCell
        title={row.title_en}
        description={row.description_en}
        tag={row.tag_en}
        stat={row.highlight_stat_en}
      />
    ),
    sortable: true,
  },
  {
    name: 'Info Ru',
    grow: 0.55,
    selector: (row) => row.title_ru,
    cell: (row) => (
      <InfoCell
        title={row.title_ru}
        description={row.description_ru}
        tag={row.tag_ru}
        stat={row.highlight_stat_ru}
      />
    ),
    sortable: true,
  },
  {
    name: 'Info Tm',
    grow: 0.55,
    selector: (row) => row.title_tm,
    cell: (row) => (
      <InfoCell
        title={row.title_tm}
        description={row.description_tm}
        tag={row.tag_tm}
        stat={row.highlight_stat_tm}
      />
    ),
    sortable: true,
  },
  {
    name: 'Brands',
    grow: 0.35,
    cell: (row) => (
      <span style={{ fontSize: '0.8em' }}>
        {row.brands && row.brands.length > 0 ? row.brands.join(', ') : '—'}
      </span>
    ),
  },
];

const ExpertiseTable = ({ data, onAdd, onEdit }: Props) => {
  return (
    <DashboardTable title="Expertise (Services Section)">
      <div className={'tableWrapper'}>
        {data && (
          <DataTable
            columns={[
              ...columns,
              {
                name: <ActionsHeader>Tools</ActionsHeader>,
                grow: 0.35,
                cell: (row) => (
                  <ActionsCell>
                    <Button
                      text="Edit"
                      size="sm"
                      icon="editSVG"
                      style="secondary"
                      onClick={() => onEdit(row as ServiceSection)}
                    />
                  </ActionsCell>
                ),
              },
            ]}
            data={data}
          />
        )}
        {!data && 'No Data'}
        <DashboardTableCta>
          <Button size="sm" icon="plusSVG" text="Add New" onClick={() => onAdd()} />
        </DashboardTableCta>
      </div>
    </DashboardTable>
  );
};

type ExpertiseImgProps = { src: string; alt: string };
const ExpertiseImg = ({ src, alt }: ExpertiseImgProps) => (
  <img src={src} alt={alt} width={60} height={60} style={{ objectFit: 'cover' }} />
);

type InfoCellProps = {
  title: string;
  description: string;
  tag: string;
  stat: string | null;
};
const InfoCell = ({ title, description, tag, stat }: InfoCellProps) => (
  <p style={{ fontSize: '0.8em', lineHeight: 1.5 }}>
    <b>{title}</b>
    <br />
    {description}
    <br />
    {tag && <><i>{tag}</i>{stat && ` — ${stat}`}</>}
  </p>
);

export default ExpertiseTable;
