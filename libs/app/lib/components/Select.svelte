<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SelectItemType } from "../types";
  import Menu from "./Menu.svelte";
  import TextField from "./TextField.svelte";
  import Icon from "./Icon.svelte";
  import List from "./list/List.svelte";
  import ListItem from "./list/ListItem.svelte";

  export let value: string | string[] | undefined = undefined;
  export let items: SelectItemType[] = [];
  export let multiple: boolean = false;
  export let max: number = 3;
  export let clearable: boolean = true;
  export let hideDetails: boolean = false;
  export let errorMessage: string | undefined = undefined;

  let active = false;
  const dispatch = createEventDispatcher<{ change: string | string[] }>();

  const getSelectString = (v: string): string => {
    const item = items.find((i: SelectItemType) => i.value === v);
    return item ? item.label : "";
  };

  const format = (selected: string | string[]) =>
    Array.isArray(selected)
      ? selected.map((item) => getSelectString(item)).join(", ")
      : getSelectString(selected);

  const onSelect = (item: SelectItemType) => {
    if (multiple) {
      value = value as string[];

      if (value.includes(item.value)) {
        if (value.length > 1) {
          value.splice(value.indexOf(item.value), 1);
          value = value;
        }
      } else if (value.length < max) {
        value = [...value, item.value];
      }
    } else {
      value = item.value;
    }

    if (!multiple) {
      active = false;
    }
  };

  const onClear = () => {
    value = "";
  };

  $: dispatch("change", value);

  $: textFieldValue = format(value!);

  $: isSelected = (item: SelectItemType) => {
    return multiple ? value?.includes(item.value) : value === item.value;
  };
</script>

<Menu bind:active nudgeY={hideDetails ? 2 : -14}>
  <div slot="activator">
    <TextField value={textFieldValue} {hideDetails} {errorMessage} selectMode>
      <span slot="append" class="flex cursor-pointer">
        {#if clearable && value}
          <Icon name="close" on:click={onClear} />
        {/if}
        <span class="pointer-events-none">
          <Icon name="chevron" rotate={active ? 180 : 0} />
        </span>
      </span>
    </TextField>
  </div>

  <List>
    {#each items as item}
      <ListItem
        label={item.label}
        on:click={() => onSelect(item)}
        active={isSelected(item)}
      />
    {/each}
  </List>
</Menu>
