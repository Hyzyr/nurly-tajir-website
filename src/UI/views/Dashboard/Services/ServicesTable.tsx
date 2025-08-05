'use client';
import { Service } from '@/types/supabase';
import React, { useRef, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, {
  ActionsCell,
  ActionsHeader,
  DashboardTableCta,
} from '../DashboardTable';
import Button from '@/UI/components/Button';
import ServiceEditModal from './ServiceEditModal';
import { ModalRef } from '@/UI/components/Modal/Modal';

type ServiceWithID = Service & { index: number };
type Props = {
  data: ServiceWithID[] | null;
  refetch: () => void;
};
const columns: TableColumn<ServiceWithID>[] = [
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
      row.image ? <ServiceImg src={row.image} alt={row.title_en} /> : null,
    grow: 0,
  },
  {
    name: 'icon',
    cell: (row) =>
      row.image_icon ? (
        <ServiceImg src={row.image_icon} alt={row.title_en} />
      ) : (
        'no icon'
      ),
    grow: 0,
  },
  {
    name: 'Info En',
    grow: 0.85,
    selector: (row) => row.title_en,
    cell: (row) => (
      <ServiceDescriptions
        title={row.title_en}
        description={row.description_en}
      />
    ),
    sortable: true,
  },
  {
    name: 'Info Ru',
    grow: 0.85,
    selector: (row) => row.title_ru,
    cell: (row) => (
      <ServiceDescriptions
        title={row.title_ru}
        description={row.description_ru}
      />
    ),
    sortable: true,
  },
  {
    name: 'Info Tm',
    grow: 0.85,
    selector: (row) => row.title_tm,
    cell: (row) => (
      <ServiceDescriptions
        title={row.title_tm}
        description={row.description_tm}
      />
    ),
    sortable: true,
  },
];

const ServicesTable = ({ data }: Props) => {
  const editModalRef = useRef<ModalRef | null>(null);
  const [editModalData, setEditModalData] = useState<Service | null>(null);

  const onAdd = () => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(null);
  };
  const onEdit = (data: Service) => {
    if (editModalRef.current) editModalRef.current.show();
    setEditModalData(data);
  };
  const editModalClose = () => {
    // if (editModalRef.current) editModalRef.current.hide();
  };

  return (
    <DashboardTable title="Services">
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
                      onClick={() => onEdit(row as Service)}
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
            icon="editFilledSVG"
            text="Add New"
            onClick={() => onAdd()}
          />
        </DashboardTableCta>
      </div>

      {data && (
        <ServiceEditModal
          ref={editModalRef}
          data={editModalData ?? null}
          onClose={() => editModalClose()}
        />
      )}
    </DashboardTable>
  );
};

type ServiceImgProps = {
  src: string;
  alt: string;
};
const ServiceImg = ({ src, alt }: ServiceImgProps) => {
  const url = src.startsWith('http') ? src : `/images/website/services/${src}`;

  return <img src={url} alt={alt} width={60} height={60} />;
};

type ServiceDescriptionsProps = {
  title: string;
  description: string;
};
const ServiceDescriptions = ({
  title,
  description,
}: ServiceDescriptionsProps) => {
  return (
    <p style={{ maxWidth: 'unset', padding: '0.5em 0' }}>
      <b>{title} </b> <br />
      <span>{description}</span>
    </p>
  );
};
export default ServicesTable;
