import sum from '@/sum'

describe('sum', () => {
  it('1 + 1 は 2 となること', () => {
    expect(sum(1, 1)).toBe(2)
  })
})
