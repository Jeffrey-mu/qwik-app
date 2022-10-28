import { component$, useClientEffect$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import styles from './flower.css?inline';
import { data } from '../../components/header/header'
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const state = useStore({
    count: 0,
    number: 20,
  });

  useClientEffect$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 1), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 7000);
    cleanup(() => clearInterval(internal));
  });

  return (
    <>
      <div>
        {
          data.map(item => {
            return <>
              <h1>{item.title}</h1>
              <p>{item.time}</p>
              <p>{item.subtitle}</p>
            </>
          })
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Flower',
};
