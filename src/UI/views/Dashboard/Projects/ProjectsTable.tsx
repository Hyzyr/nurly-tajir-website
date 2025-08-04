'use client';
import { Project } from '@/types/supabase';
import { fetchAll } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, {
  ActionsCell,
  ActionsHeader,
  DashboardTableCta,
} from '../DashboardTable';
import Button from '@/UI/components/Button';

type ProjectWithID = Project & { index: number };

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
    cell: (row) =>
      row.image ? <ProjectImg src={row.image} alt={row.title_en} /> : null,
    grow: 0,
  },
  {
    name: 'Title En',
    selector: (row) => row.title_en,
    cell: (row) => (
      <InfoCell title={row.title_en} description={row.description_en} />
    ),
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Title Ru',
    selector: (row) => row.title_ru,
    cell: (row) => (
      <InfoCell title={row.title_ru} description={row.description_ru} />
    ),
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Title Tm',
    selector: (row) => row.title_tm,
    cell: (row) => (
      <InfoCell title={row.title_tm} description={row.description_tm} />
    ),
    sortable: true,
    grow: 0.45,
  },
];

const ProjectsTable = () => {
  const [data, setData] = useState<ProjectWithID[] | null>(null);

  useEffect(() => {
    fetchAll<Project>('projects').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));

      setData(dataWithIndex as ProjectWithID[]);
    });
  }, []);
  const onEdit = (data: Project) => console.log('edit data : ', data);

  if (!data) return 'No data';
  return (
    <DashboardTable title="Projects">
      <div className={'tableWrapper'}>
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
                    icon="arrowCorner"
                    style="outlined"
                    onClick={() => onEdit(row as Project)}
                  />
                </ActionsCell>
              ),
            },
          ]}
          data={data}
        />
        <DashboardTableCta>
          <Button size="sm" icon="mapPinIcon" text="Add New" />
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

export default ProjectsTable;
