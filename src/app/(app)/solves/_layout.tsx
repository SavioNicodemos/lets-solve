import { Redirect, Slot } from 'expo-router';

import { useGroups } from '@/hooks/queries/useGroups';

export default function SolveLayout() {
  const { data: groups } = useGroups();

  if (groups.length === 0) {
    return <Redirect href="/groups/" />;
  }

  return <Slot />;
}
