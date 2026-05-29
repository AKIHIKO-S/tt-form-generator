import { describe, it, expect } from 'vitest';
import { tournaments } from './tournaments.js';

describe('tournaments data integrity', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(tournaments)).toBe(true);
    expect(tournaments.length).toBeGreaterThan(0);
  });

  it('has unique tournament ids', () => {
    const ids = tournaments.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(tournaments.map(t => [t.id, t]))('[%s] has a name and at least one event', (_id, t) => {
    expect(typeof t.name).toBe('string');
    expect(t.name.length).toBeGreaterThan(0);
    expect(Array.isArray(t.events)).toBe(true);
    expect(t.events.length).toBeGreaterThan(0);
  });

  it.each(tournaments.map(t => [t.id, t]))('[%s] events have unique ids, titles and labelled fields', (_id, t) => {
    const evIds = new Set();
    for (const ev of t.events) {
      expect(ev.id, 'event id present').toBeTruthy();
      expect(evIds.has(ev.id), `duplicate event id ${ev.id}`).toBe(false);
      evIds.add(ev.id);
      expect(typeof ev.title).toBe('string');
      expect(ev.title.length).toBeGreaterThan(0);
      expect(Array.isArray(ev.fields)).toBe(true);
      expect(ev.fields.length).toBeGreaterThan(0);
      for (const f of ev.fields) {
        expect(f.key, 'field key present').toBeTruthy();
        expect(f.label, `field ${f.key} label present`).toBeTruthy();
      }
    }
  });

  it.each(tournaments.map(t => [t.id, t]))('[%s] categories (when present) have a name and numeric fee', (_id, t) => {
    for (const ev of t.events) {
      expect(Array.isArray(ev.categories)).toBe(true);
      for (const c of ev.categories) {
        expect(c.name, 'category name present').toBeTruthy();
        expect(typeof c.fee, `category ${c.name} fee is numeric`).toBe('number');
        expect(c.fee).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it.each(tournaments.map(t => [t.id, t]))('[%s] extras (when present) have an id and numeric price', (_id, t) => {
    for (const ex of t.extras || []) {
      expect(ex.id, 'extra id present').toBeTruthy();
      expect(typeof ex.price).toBe('number');
      expect(ex.price).toBeGreaterThanOrEqual(0);
    }
  });

  // Known data-quality note: a handful of auto-generated events ship with an
  // empty `categories` array. The form UI handles these via a free-text "区分"
  // input (see App.jsx), so they are not fatal — but they bill at ¥0. This test
  // documents the current set so a regression (new empty-category events
  // appearing unnoticed) is caught in review.
  it('documents the events that currently have no categories', () => {
    const empty = [];
    for (const t of tournaments) {
      for (const ev of t.events) {
        if (!ev.categories || ev.categories.length === 0) {
          empty.push(`${t.id}/${ev.id}`);
        }
      }
    }
    expect(empty).toEqual([
      'nittaku/event_2',
      'nittaku/event_3',
      'tancho/event_2',
      'tancho/event_3',
      'doubles_team/event_3',
    ]);
  });
});
