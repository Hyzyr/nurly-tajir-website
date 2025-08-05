'use client';
import { Project } from '@/types/supabase';
import React, { useRef, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, {
  ActionsCell,
  ActionsHeader,
  DashboardTableCta,
} from '../DashboardTable';
import Button from '@/UI/components/Button';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ProjectsEditModal from './ProjectsEditModal';

type ProjectWithID = Project & { index: number };
type Props = {
  data: ProjectWithID[] | null;
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
    cell: (row) =>
      row.image ? <ProjectImg src={row.image} alt={row.title_en} /> : null,
    grow: 0,
  },
  {
    name: 'Info En',
    selector: (row) => row.title_en,
    cell: (row) => (
      <InfoCell title={row.title_en} description={row.description_en} />
    ),
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Info Ru',
    selector: (row) => row.title_ru,
    cell: (row) => (
      <InfoCell title={row.title_ru} description={row.description_ru} />
    ),
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Info Tm',
    selector: (row) => row.title_tm,
    cell: (row) => (
      <InfoCell title={row.title_tm} description={row.description_tm} />
    ),
    sortable: true,
    grow: 0.45,
  },
];

const ProjectsTable = ({ data }: Props) => {
  const editModalRef = useRef<ModalRef>(null);
  const [editModalData, setEditModalData] = useState<Project | null>(null);

  const onEdit = (data: Project) => {
    setEditModalData(data);
    if (editModalRef.current) editModalRef.current.show();
  };
  const onAdd = () => {
    // if (editModalRef.current) editModalRef.current.show();
    // setEditModalData(null);
  };
  const editModalClose = () => {
    if (editModalRef.current) editModalRef.current.hide();
  };

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
          <Button
            size="sm"
            icon="plusSVG"
            text="Add New"
            onClick={() => onAdd()}
          />
        </DashboardTableCta>
      </div>
      {data && (
        <ProjectsEditModal
          ref={editModalRef}
          data={editModalData ?? null}
          onClose={() => editModalClose()}
        />
      )}
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
