import { MultiplyBy100Pipe } from './multiply-by100.pipe';

describe('MultiplyBy100Pipe', () => {
  it('create an instance', () => {
    const pipe = new MultiplyBy100Pipe();
    expect(pipe).toBeTruthy();
  });
});
