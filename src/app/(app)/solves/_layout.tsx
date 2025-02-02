import { Redirect, Slot } from 'expo-router';
import { useGroups } from '@/features/groups/queries';

export default function SolveLayout() {
  const { data: groups } = useGroups();

  if (groups.length === 0) {
    return <Redirect href="/groups/" />;
  }

  return <Slot />;
}
