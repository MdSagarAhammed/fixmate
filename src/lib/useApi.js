'use client';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { api } from './api';

export function useApi(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    try { setData(await api(path)); } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  }, [path]);
  useEffect(() => { load(); }, [load]);
  return { data, loading, reload: load };
}
