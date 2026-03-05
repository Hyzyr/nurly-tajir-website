import React from 'react';

type OrganizationLD = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
    streetAddress: string;
  };
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
};

type WebPageLD = {
  '@context': 'https://schema.org';
  '@type': 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  name: string;
  description: string;
  url: string;
  publisher?: { '@type': 'Organization'; name: string };
};

type BreadcrumbLD = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
};

const SITE_URL = 'https://nurlytajir.com';

export const organizationJsonLd: OrganizationLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nurly Tajir',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  description:
    'Leading IT and infrastructure systems company in Turkmenistan. Official distributor of Samsung, Bosch, Philips, Hikvision, Cisco, and Honeywell. Specializing in network infrastructure, CCTV, access control, fire detection, IP telephony, video walls, and smart building solutions in Ashgabat.',
  foundingDate: '2005',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ashgabat',
    addressCountry: 'TM',
    streetAddress: 'Söwda Merkezi, 3rd Floor, Sona M. Street',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+99364647032',
    contactType: 'customer service',
    email: 'info@nurlytajir.com',
  },
  sameAs: [],
};

export function generateWebPageJsonLd(
  name: string,
  description: string,
  path: string,
  type: WebPageLD['@type'] = 'WebPage'
): WebPageLD {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: `${SITE_URL}${path}`,
    publisher: { '@type': 'Organization', name: 'Nurly Tajir' },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; path: string }[]
): BreadcrumbLD {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

type JsonLdProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
};

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export { SITE_URL };
export default JsonLd;
