<script setup lang="ts">
import { JournalEntry } from ".prisma/client";
import { useVirtualList } from "@vueuse/core";
import { useInfiniteScroll } from "@vueuse/core";

definePageMeta({
  title: "Journal",
  middleware: "auth",
});

const content = ref("");
const date = ref("");
const hours = ref<number | null>(null);
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const el = ref<HTMLElement>();
const ascending = ref(true);

const { $client } = useNuxtApp();

const {
  data: entries,
  pending,
  refresh,
  error,
} = await $client.entryRouter.getEntries.useQuery();

// entries should be sorted by date in either descending or ascending order depending on the ascending variable
const sortedEntries = computed(() => {
  if (entries.value) {
    return entries.value.sort((a: JournalEntry, b: JournalEntry) => {
      if (ascending.value) {
        return a.date > b.date ? 1 : -1;
      } else {
        return a.date < b.date ? 1 : -1;
      }
    });
  }
});


const addEntry = async () => {
  const entry = {
    content: content.value,
    date: date.value,
    hours: hours.value!,
    id: 1,
  };
  await $client.entryRouter.addEntry.mutate(entry);
  refresh();
};
const updateDate = (inputDate: string) => {
  date.value = inputDate;
};

const updateContent = (editorContent: string) => {
  content.value = editorContent;
};

const updateHours = (inputHours: string) => {
  hours.value = Number(inputHours);
};

const filteredList = computed(() =>
  // filter entries between start and end date
  entries!.value!.filter(
    (entry: JournalEntry) =>
      entry.date >= startDate.value! && entry.date <= endDate.value!
  )
);
// SORT   BY START DATE
const { list, containerProps, wrapperProps } = useVirtualList(sortedEntries.value!, {
  itemHeight: 22,
});

const test = () => {
  console.log("test");
};

useInfiniteScroll(el, () => test(), { distance: 10 });
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full mt-[calc(var(--navigation-height)_+_1.1rem)]"
  >
    <Grid :col="'2'">
      <div class="flex">
        <div class="">
          <Editor theme="snow" @text-change="updateContent" />
          <Button :onClick="addEntry" class="mt-4">Add Entry</Button>
        </div>
        <div class="ml-4">
          <label for="date">Date</label>
          <Input type="date" name="date" @value-change="updateDate" />
          <label for="hours">Hours</label>
          <Input type="number" name="hours" @value-change="updateHours" />
        </div>
      </div>
      <div v-if="pending">loading....</div>
      <div v-if="error">
        {{ error }}
      </div>
      <div v-else>
        <div ref="el">
          <div
            v-bind="containerProps"
            style="height: 500px"
            class="scrollbar-hide"
          >
            <div v-bind="wrapperProps" class="scrollbar-hide">
              <div
                v-for="entry in list"
                :key="entry.data.id"
                class="flex flex-col items-center mt-4 scrollbar-hide scroll"
              >
                <Card>
                  <div class="flex flex-col">
                    <div>
                      <span class="font-bold">Date: </span>
                      <span>{{ entry.data.date }}</span>
                    </div>
                    <div>
                      <span class="font-bold">Hours: </span>
                      <span>{{ entry.data.hours }}</span>
                    </div>
                    <div>
                      <div v-html="entry.data.content" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  </div>
</template>
