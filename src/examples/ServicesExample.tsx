/**
 * Example React component showing how to fetch and display services_section data
 * This is a reference implementation - adapt to your project structure
 */

import { getTranslation } from '@/utils/i18n-helpers';
import { createClient } from '@/utils/supabase/server';
import type { ServiceSection } from '@/types/supabase';

/**
 * Server Component - Fetch services on the server side
 */
export default async function ServicesPage({
  params: { locale },
}: {
  params: { locale: 'en' | 'ru' | 'tm' };
}) {
  const supabase = createClient();

  // Fetch all services ordered by display_order
  const { data: services, error } = await supabase
    .from('services_section')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return <div>Error loading services</div>;
  }

  if (!services || services.length === 0) {
    return <div>No services found</div>;
  }

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} locale={locale} />
        ))}
      </div>
    </div>
  );
}

/**
 * Service Card Component
 */
function ServiceCard({
  service,
  locale,
}: {
  service: ServiceSection;
  locale: 'en' | 'ru' | 'tm';
}) {
  return (
    <article className="service-card">
      {/* Service Tag */}
      <span className="service-tag">
        {getTranslation(service, 'tag', locale)}
      </span>

      {/* Image */}
      {service.image && (
        <div className="service-image">
          <img src={service.image} alt={getTranslation(service, 'title', locale)} />
        </div>
      )}

      {/* Title */}
      <h2 className="service-title">{getTranslation(service, 'title', locale)}</h2>

      {/* Short Description */}
      <p className="service-description">
        {getTranslation(service, 'info', locale)}
      </p>

      {/* Long Description (expandable) */}
      <details className="service-details">
        <summary>Learn More</summary>
        <p>{getTranslation(service, 'description', locale)}</p>
      </details>

      {/* Highlight Stat */}
      <div className="service-highlight">
        <strong>{getTranslation(service, 'highlight_stat', locale)}</strong>
      </div>
    </article>
  );
}

/**
 * Alternative: Client Component with useState/useEffect
 */
'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { createClient } from '@/utils/supabase/client';

export function ServicesGridClient() {
  const locale = useLocale() as 'en' | 'ru' | 'tm';
  const [services, setServices] = useState<ServiceSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('services_section')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error:', error);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    }

    loadServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="services-grid">
      {services.map((service) => (
        <div key={service.id} className="service-card">
          <h3>{getTranslation(service, 'title', locale)}</h3>
          <p>{getTranslation(service, 'info', locale)}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example: Get single service by slug
 */
export async function getServiceBySlug(slug: string): Promise<ServiceSection | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('services_section')
    .select('*')
    .eq('service_slug', slug)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }

  return data;
}

/**
 * Example: Service Detail Page
 */
export async function ServiceDetailPage({
  params: { locale, slug },
}: {
  params: { locale: 'en' | 'ru' | 'tm'; slug: string };
}) {
  const service = await getServiceBySlug(slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="service-detail">
      <h1>{getTranslation(service, 'title', locale)}</h1>

      {service.image && (
        <img src={service.image} alt={getTranslation(service, 'title', locale)} />
      )}

      <div className="service-content">
        <p className="lead">{getTranslation(service, 'info', locale)}</p>
        <div className="body">{getTranslation(service, 'description', locale)}</div>
      </div>

      <aside className="service-stat">
        <h3>Key Achievement</h3>
        <p>{getTranslation(service, 'highlight_stat', locale)}</p>
      </aside>
    </div>
  );
}
