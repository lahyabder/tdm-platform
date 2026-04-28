'use client';
import { CorrespondenceList } from '../CorrespondenceList';
export default function OutgoingPage({ params }: { params: Promise<{ locale: string }> }) {
  return <CorrespondenceList params={params} type="outgoing" />;
}
