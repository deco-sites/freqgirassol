import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useEffect } from "preact/hooks";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props {
  alerts?: {
    alert: string;
    /** @format color */
    background?: string;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      {alerts.map((alert, index) => (
        <Slider
          class={`carousel carousel-center w-full gap-6 text-center p-2`}
          style={{ "background-color": alert.background }}
        >
          <Slider.Item index={index} class="carousel-item w-full">
            <span
              class={`text-xs md:text-sm font-bold text-white flex justify-center items-center w-full`}
            >
              {alert.alert}
            </span>
          </Slider.Item>
        </Slider>
      ))}

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
