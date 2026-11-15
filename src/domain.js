import { Problem, identifier } from './common.js';
export class Board {
  reports = new Map();
  add(input) {
    const id = identifier(input?.id);
    if (!['up', 'degraded', 'down'].includes(input.status)) throw new Problem(400, 'invalid_status');
    if (this.reports.has(id)) throw new Problem(409, 'duplicate_report');
    if (this.reports.size >= 100) throw new Problem(409, 'board_full');
    const row = { id, status: input.status };
    this.reports.set(id, row); return row;
  }
  list(status) {
    if (status !== undefined && !['up', 'degraded', 'down'].includes(status)) throw new Problem(400, 'invalid_status');
    const reports = [...this.reports.values()].filter(r => status === undefined || r.status === status).sort((a,b) => a.id.localeCompare(b.id));
    return { reports, counts: Object.fromEntries(['up','degraded','down'].map(s => [s, reports.filter(r => r.status === s).length])) };
  }
  get(id) { const row=this.reports.get(identifier(id)); if (!row) throw new Problem(404,'not_found'); return row; }
}
