'use client';
import { CorrespondenceList } from '../CorrespondenceList';
export default function IncomingPage({ params }: { params: Promise<{ locale: string }> }) {
  return <CorrespondenceList params={params} type="incoming" />;
}
