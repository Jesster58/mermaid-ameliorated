<script lang="ts">
  import { getTheme } from '$/util/theme.svelte';
  import { cubicInOut } from 'svelte/easing';
  import { type TransitionConfig } from 'svelte/transition';
  import MoonIcon from '~icons/material-symbols/dark-mode-outline-rounded';
  import SunIcon from '~icons/material-symbols/light-mode-outline-rounded';
  import ObsidianIcon from '~icons/material-symbols/bedtime-outline-rounded';
  import DeepBlackIcon from '~icons/material-symbols/dark-mode-rounded';
  import MonoIcon from '~icons/material-symbols/contrast';

  const spin = (
    node: Element,
    { duration = 400, easing = cubicInOut, clockWise = true } = {}
  ): TransitionConfig => {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    return {
      duration,
      easing,
      css: (t, u) => `
        transform: ${transform} rotate(${u * 90 * (clockWise ? 1 : -1)}deg);
        opacity: ${opacity * t}
      `
    };
  };

  const iconForTheme = (id: string) => {
    switch (id) {
      case 'light':
        return SunIcon;
      case 'dark':
        return MoonIcon;
      case 'obsidian':
        return ObsidianIcon;
      case 'deep-black':
        return DeepBlackIcon;
      case 'mono-industrial':
        return MonoIcon;
      default:
        return MoonIcon;
    }
  };
</script>

{#key getTheme().id}
  <div in:spin={{ clockWise: true }} out:spin={{ clockWise: false }}>
    <svelte:component this={iconForTheme(getTheme().id)} />
  </div>
{/key}
