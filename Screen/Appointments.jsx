import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const BASE_URI = 'https://your-api-base-uri.com'; 
const BASE = BASE_URI.replace(/\/+$/, '');
const API_BASE = `${BASE}/api/appointment`;
const APPOINTMENT_CANDIDATES = [API_BASE, `${BASE}/api/appointments`, `${BASE}/appointments`, `${BASE}/appointment`];


const [appointmentApi, setAppointmentApi] = useState(null);

const syncPending = useCallback(async () => {
  const list = Array.isArray(upcoming) ? upcoming : [];
  const pending = list.filter(a => a._pending);
  if (!pending.length) return;
  const apiBase = appointmentApi || API_BASE;
  for (const p of pending) {
    try {
      const res = await axios.post(apiBase, {
        doctorName: p.doctorName,
        specialty: p.specialty,
        date: p.date,
        time: p.time,
      }, { timeout: 10000 });
      const created = res?.data?.data || res?.data;
      if (created && created._id) {
 
        setUpcoming(prev => prev.map(x => (x._id === p._id ? created : x)));
      }
    } catch (err) {
      console.log('syncPending failed for', p._id, err?.response?.status || err?.message);

    }
  }
}, [upcoming, appointmentApi]);


useEffect(() => {
  const unsub = navigation.addListener('focus', async () => {
    await fetchAppointments();
    await syncPending();
  });

  fetchAppointments().then(syncPending);
  return unsub;
}, [navigation, fetchAppointments, syncPending]);

