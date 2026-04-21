import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export type ListingData = {
  id: string;
  listingTitle?: string;
  listingDescription?: string;
  sellingPrice?: number;
  itemAge?: number;
  itemBrand?: string;
  deliveryMethod?: string;
  isPickupAvailable?: boolean;
  address?: {
    state?: string;
  };
  category?: {
    name?: string;
  };
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 32,
    backgroundColor: '#ffffff',
    color: '#171a20',
    fontSize: 10,
    fontFamily: 'Helvetica',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  brandBlock: {
    flexDirection: 'column',
    gap: 4,
  },
  brandText: {
    fontSize: 11,
    color: '#5b616b',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: '#171a20',
  },
  headerMeta: {
    alignItems: 'flex-end',
  },
  headerMetaLine: {
    fontSize: 10,
    color: '#606775',
    marginBottom: 3,
  },

  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    backgroundColor: '#ffffff',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: '#171a20',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f1f3',
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#171a20',
    marginBottom: 10,
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 14,
  },
  infoItem: {
    width: '47%',
  },
  label: {
    fontSize: 8,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  value: {
    fontSize: 10,
    color: '#171a20',
  },

  descriptionText: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
  },

  pricingTable: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 2,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pricingRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
  },
  pricingLabel: {
    fontSize: 10,
    color: '#171a20',
  },
  pricingValue: {
    fontSize: 10,
    color: '#171a20',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: '#171a20',
  },
  totalValue: {
    fontSize: 11,
    fontWeight: 700,
    color: '#171a20',
  },

  footer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.45,
  },
});

function formatCurrency(value?: number) {
  if (typeof value !== 'number') return 'N/A';

  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function yesNo(value?: boolean) {
  if (typeof value !== 'boolean') return 'N/A';
  return value ? 'Yes' : 'No';
}

function buildInvoiceNumber(listingId: string) {
  return `INV-${listingId.slice(0, 8).toUpperCase()}`;
}

export function buildInvoiceDocument(listing: ListingData) {
  return (
    <Document
      title={`Invoice - ${listing.listingTitle ?? listing.id}`}
      author='Garage'
      subject='Fire truck invoice'
    >
      <Page
        size='LETTER'
        style={styles.page}
      >
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Text style={styles.brandText}>Garage</Text>
            <Text style={styles.invoiceTitle}>Invoice</Text>
          </View>

          <View style={styles.headerMeta}>
            <Text style={styles.headerMetaLine}>
              Invoice #: {buildInvoiceNumber(listing.id)}
            </Text>
            <Text style={styles.headerMetaLine}>
              Date Generated: {formatDate(new Date())}
            </Text>
            <Text style={styles.headerMetaLine}>Listing ID: {listing.id}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Vehicle Summary</Text>

          <Text style={styles.summaryTitle}>
            {listing.listingTitle ?? 'Untitled Listing'}
          </Text>

          <View style={styles.infoItem}>
            <Text style={styles.label}>Purchase Price</Text>
            <Text style={styles.value}>
              {formatCurrency(listing.sellingPrice)}
            </Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Year</Text>
              <Text style={styles.value}>
                {listing.itemAge ? String(listing.itemAge) : 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Brand</Text>
              <Text style={styles.value}>{listing.itemBrand ?? 'N/A'}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.value}>
                {listing.category?.name ?? 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>
                {listing.address?.state ?? 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.descriptionText}>
            {listing.listingDescription ?? 'No description available.'}
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Delivery & Availability</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Delivery Method</Text>
              <Text style={styles.value}>
                {listing.deliveryMethod ?? 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Pickup Available</Text>
              <Text style={styles.value}>
                {yesNo(listing.isPickupAvailable)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Pricing</Text>

          <View style={styles.pricingTable}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Vehicle Purchase Price</Text>
              <Text style={styles.pricingValue}>
                {formatCurrency(listing.sellingPrice)}
              </Text>
            </View>

            <View style={styles.pricingRowTotal}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(listing.sellingPrice)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This invoice is generated for review and approval purposes based on
            the current Garage listing data. Final sale terms, taxes, fees, and
            transport arrangements may be subject to separate agreement.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
