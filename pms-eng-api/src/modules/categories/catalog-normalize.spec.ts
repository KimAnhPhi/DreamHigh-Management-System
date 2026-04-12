import { normalizeCatalogCode, normalizeCatalogName } from './catalog-normalize';

describe('catalog-normalize', () => {
  it('strips and uppercases code', () => {
    expect(normalizeCatalogCode('  prg  - 01  ')).toBe('PRG-01');
  });

  it('collapses spaces in name', () => {
    expect(normalizeCatalogName('  IELTS   Academic  ')).toBe('IELTS Academic');
  });
});
