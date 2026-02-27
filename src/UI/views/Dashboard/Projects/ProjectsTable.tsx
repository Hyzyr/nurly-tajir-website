'use client';
import { Project } from '@/types/supabase';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, { ActionsCell, ActionsHeader, DashboardTableCta } from '../DashboardTable';
import Button from '@/UI/components/Button';

type ProjectWithID = Project & { index: number };
type Props = {
  data: ProjectWithID[] | null;
  onAdd: () => void;
  onEdit: (data: Project) => void;
};
const columns: TableColumn<ProjectWithID>[] = [
  {
    name: 'ID',
    selector: (row) => row.index,
    grow: 0,
    sortable: true,
    width: '80px',
  },
  {
    name: 'Image',
    cell: (row) => (row.image ? <ProjectImg src={row.image} alt={row.title_en} /> : null),
    grow: 0,
  },
  {
    name: 'Info En',
    selector: (row) => row.title_en,
    cell: (row) => <InfoCell title={row.title_en} description={row.description_en} />,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Info Ru',
    selector: (row) => row.title_ru,
    cell: (row) => <InfoCell title={row.title_ru} description={row.description_ru} />,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Info Tm',
    selector: (row) => row.title_tm,
    cell: (row) => <InfoCell title={row.title_tm} description={row.description_tm} />,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Meta',
    grow: 0.4,
    cell: (row) => (
      <MetaCell
        client={row.client}
        location={row.location}
        completedAt={row.completed_at}
      />
    ),
  },
  {
    name: 'Tags',
    grow: 0.4,
    cell: (row) => <TagsCell tags={row.tags} stats={row.stats} />,
  },
  {
    name: 'Show on Main',
    grow: 0,
    width: '110px',
    center: true,
    cell: (row) => <ShowOnMainCell value={row.show_in_main} />,
  },
];

const ProjectsTable = ({ data, onAdd, onEdit }: Props) => {
  return (
    <DashboardTable title="Projects">
      <div className={'tableWrapper'}>
        {data && (
          <DataTable
            columns={[
              ...columns,
              {
                name: <ActionsHeader>Tools</ActionsHeader>,
                grow: 0.45,
                cell: (row) => (
                  <ActionsCell>
                    <Button
                      text="Edit"
                      size="sm"
                      icon="editSVG"
                      style="secondary"
                      onClick={() => onEdit(row)}
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
type InfoCellProps = {
  title: string;
  description: string;
};
const InfoCell = ({ title, description }: InfoCellProps) => {
  return (
    <p>
      <b>{title}</b> <br />
      {description}
    </p>
  );
};
type ProjectImgProps = {
  src: string;
  alt: string;
};

const ProjectImg = ({ src, alt }: ProjectImgProps) => {
  return <img src={src} alt={alt} width={80} height={80} />;
};

type MetaCellProps = {
  client: string | null;
  location: string | null;
  completedAt: string | null;
  showInMain: boolean;
};
const MetaCell = ({ client, location, completedAt }: Omit<MetaCellProps, 'showInMain'>) => (
  <p style={{ fontSize: '0.8em', lineHeight: 1.5 }}>
    {client && <><b>Client:</b> {client}<br /></>}
    {location && <><b>Location:</b> {location}<br /></>}
    {completedAt && <><b>Completed:</b> {completedAt}<br /></>}
  </p>
);

const ShowOnMainCell = ({ value }: { value: boolean }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25em 0.7em',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 700,
      background: value ? 'var(--green-100, #dcfce7)' : 'var(--n40)',
      color: value ? 'var(--green-700, #15803d)' : 'var(--n300)',
    }}
  >
    {value ? '✓ Yes' : '✗ No'}
  </span>
);

type TagsCellProps = {
  tags: string[] | null;
  stats: string[] | null;
};
const TagsCell = ({ tags, stats }: TagsCellProps) => (
  <p style={{ fontSize: '0.8em', lineHeight: 1.6 }}>
    {tags && tags.length > 0 && <><b>Tags:</b> {tags.join(', ')}<br /></>}
    {stats && stats.length > 0 && <><b>Stats:</b> {stats.join(', ')}</>}
  </p>
);

export default ProjectsTable;
