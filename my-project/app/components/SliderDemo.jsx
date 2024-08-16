import { RangeSlider } from '@mantine/core';

export function SliderDemo() {
  return (
    <RangeSlider color='black' minRange={20} min={50} max={80} step={1} defaultValue={[0.1245, 0.5535]}/>
  );
}