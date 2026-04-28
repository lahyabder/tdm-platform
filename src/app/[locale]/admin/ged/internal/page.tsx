'use client';
import { CorrespondenceList } from '../CorrespondenceList';
export default function InternalPage({ params }: { params: Promise<{ locale: string }> }) {
  return <CorrespondenceList params={params} type="internal" />;
}
