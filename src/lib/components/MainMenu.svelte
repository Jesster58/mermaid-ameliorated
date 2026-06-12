<script lang="ts">
  import * as Popover from '$/components/ui/popover';
  import { env } from '$/util/env';
  import { urls } from '$/util/state.svelte';
  import { cn } from '$/utils';
  import { themes, getTheme, setTheme } from '$/util/theme.svelte';
  import type { Component, Snippet } from 'svelte';
  import AddIcon from '~icons/material-symbols/add-2-rounded';
  import BookIcon from '~icons/material-symbols/book-2-outline-rounded';
  import DuplicateIcon from '~icons/material-symbols/content-copy-outline-rounded';
  import MenuIcon from '~icons/material-symbols/menu-rounded';
  import CommunityIcon from '~icons/material-symbols/person-play-outline-rounded';
  import PaletteIcon from '~icons/material-symbols/styler-outline-rounded';

  interface MenuItem {
    label: string;
    icon: Component;
    href: string;
    class?: string;
    onclick?: () => void;
    sharesData?: boolean;
    checkDiagramType?: boolean;
    isSectionEnd?: boolean;
    renderer: Snippet<[Omit<MenuItem, 'renderer'>]>;
  }

  const menuItems: MenuItem[] = $derived([
    { label: 'New', icon: AddIcon, href: urls.current.new, renderer: menuItem },
    { label: 'Duplicate', icon: DuplicateIcon, href: window.location.href, renderer: menuItem },
    {
      label: 'Documentation',
      icon: BookIcon,
      href: `${env.docsUrl}/intro/`,
      renderer: menuItem
    },
    {
      label: 'Community',
      icon: CommunityIcon,
      href: 'https://discord.gg/sKeNQX4Wtj',
      renderer: menuItem
    },
    {
      href: '#',
      icon: PaletteIcon,
      isSectionEnd: true,
      label: 'Theme',
      renderer: themeMenuItem
    }
  ]);
</script>

{#snippet menuItem(options: Omit<MenuItem, 'renderer'>)}
  <a
    href={options.href}
    target="_blank"
    onclick={options.onclick}
    class={cn(
      'flex items-center justify-start gap-2 border-b-2 p-2 px-3 hover:bg-muted',
      options.isSectionEnd && 'border-border-dark',
      options.class
    )}>
    <options.icon class="size-5" />
    {options.label}
  </a>
{/snippet}

{#snippet themeMenuItem(options: Omit<MenuItem, 'renderer'>)}
  <div
    class={cn(
      'flex flex-col border-b-2 px-3 py-2',
      options.isSectionEnd && 'border-border-dark',
      options.class
    )}>
    <span class="mb-1 flex items-center gap-2 text-xs opacity-60">Theme</span>
    {#each themes as theme (theme.id)}
      <button
        class="flex w-full items-center gap-2 rounded px-1 py-1 text-left hover:bg-muted"
        class:bg-muted={getTheme().id === theme.id}
        onclick={() => setTheme(theme.id)}>
        {theme.label}
      </button>
    {/each}
  </div>
{/snippet}

<Popover.Root>
  <Popover.Trigger class="shrink-0">
    <MenuIcon class="size-6" />
  </Popover.Trigger>
  <Popover.Content align="start" class="flex flex-col overflow-hidden border-2 p-0" sideOffset={16}>
    {#each menuItems as { renderer, ...item } (item.label)}
      {@render renderer(item)}
    {/each}
  </Popover.Content>
</Popover.Root>
