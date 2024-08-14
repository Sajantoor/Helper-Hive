<script lang="ts">
    import CalendarElement from '$lib/Components/CalendarEvent.svelte';
    import { onMount } from 'svelte';
    import type { CalendarElementData } from '$lib/Types/Events';
    import Text from './Text/Text.svelte';
  
    let currentDate = new Date();
    let calendarElements: CalendarElementData[] = [];
    let currentPage = 0;
    let selectedDate = currentDate;
  
    let displayedMonths = '';
  
    const daysPerPage = 10;
  
    const generateCalendarElements = (page: number): CalendarElementData[] => {
      const elements: CalendarElementData[] = [];
      for (let i = 0; i < daysPerPage; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + page * daysPerPage + i);
        elements.push({
          img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
          title: `Science World Children's Day`,
          date: date,
          location: 'Vancouver, BC 1455 Quebec St'
        });
      }
      updateDisplayedMonths(elements);
      return elements;
    };
  
    const updateDisplayedMonths = (elements: CalendarElementData[]) => {
      const uniqueMonths = new Set(elements.map(e => e.date.toLocaleString('default', { month: 'short' })));
      displayedMonths = Array.from(uniqueMonths).join(' - ');
    };
  
    const nextPage = () => {
      currentPage++;
      calendarElements = generateCalendarElements(currentPage);
    };
  
    const previousPage = () => {
      if (currentPage > 0) {
        currentPage--;
        calendarElements = generateCalendarElements(currentPage);
      }
    };
  
    const selectDate = (date: Date) => {
      selectedDate = date;
    };
  
    onMount(() => {
      calendarElements = generateCalendarElements(currentPage);
    });
  </script>
  
  <div class="calendar-view">
    <div class="header w-full">
      <Text class="calendar-title text-2xl font-bold">Calendar</Text>
      <div class="navigation flex mt-2">
        <button on:click={previousPage} disabled={currentPage === 0}>{'<'}</button>
        <button on:click={nextPage} class="ml-2">{'>'}</button>
        <div class="selected-date-box ml-6 p-2 border rounded">
          {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })}
        </div>
        <div class="ml-2">
          <Text class="text-xl ml-6 font-bold">{`Now - ${displayedMonths}`}</Text>
        </div>
      </div>
    </div>
    <div class="calendar-grid grid grid-cols-4 gap-4 mt-4">
      {#each calendarElements as element (element.date)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
          class:selected={element.date.toDateString() === selectedDate.toDateString()}
          on:click={() => selectDate(element.date)}
          class="grid-element">
          <CalendarElement 
            img={element.img} 
            title={element.title} 
            location={element.location} 
            date={element.date} 
          />
        </div>
      {/each}
    </div>
  </div>
  
  <style lang="postcss">
    .grid-element {
      object-fit: contain;
      padding: 0;
      margin: 0;
      display: flex;
      width: 100%;
    }
  
    .calendar-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  
    .header {
      width: 90%;
    }
  
    .calendar-grid {
      width: 90%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
    }
  
    .navigation {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  
    .selected-date-box {
      border: 1px solid #ccc;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
  
    button {
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    .selected {
      border: 1px solid #D3D3D3; 
      border-radius: 4px;
    }
  
    /* Responsive Design */
    @media (max-width: 1024px) {
      .calendar-grid {
        grid-template-columns: repeat(3, 1fr); /* 3 columns on medium screens */
      }
    }
  
    @media (max-width: 768px) {
      .calendar-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
      }
  
      .header {
        width: 100%;
      }
  
      
  
      .navigation {
        justify-content: center;
        width: 100%;
        margin-top: 1rem;
      }
  
      .selected-date-box {
        margin-top: 1rem;
        margin-left: 0;
        text-align: center;
      }
    }
  
    @media (max-width: 480px) {
      .calendar-grid {
        grid-template-columns: 1fr; /* 1 column on extra small screens */
      }
  
  
      
    }
  </style>