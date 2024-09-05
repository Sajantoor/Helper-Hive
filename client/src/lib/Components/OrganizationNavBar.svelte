<script lang="ts">
    import { onMount } from 'svelte';

    export let logoSrc =
        'https://s3-alpha-sig.figma.com/img/a5d5/791e/2d61803c518e00731c64bb9fd71620c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pS2Y5JaiXMuPshMuuwitJkHxvd8t-9blwWn5GX81-dc922Iu0zh0y0AzxbuSjyMAxlJohXQWM5wCZnoU1uw4XE8AbUcrarQ42lbJ6FLN7e5FNnEYtRMxAgMOye73Hm4TJ-beOA5FV2tQ1XN4bPXojIwSkpklSbsBWriFRmhbi8CLv0DqZmJv0WEzImKn62UIE49fflbFl16TgIjVE2ueRlQhW9BVYDCM8YhxmdeSX~16zrA2Lf8pNlzUze6d6ZzbQFqum3zvqa0M4mAEm9NzisIRCfcqlZIofW-7Z9zeEsxw~BMAu5u5hvtpEMVeuwTisb1NDgRCbzzVRKJWw6sMCA__'; // Replace with your logo path
    export let profilePicSrc = 'https://cdn-icons-png.freepik.com/512/4032/4032866.png'; // www.freepik.com

    let isDropdownOpen = false;

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

    onMount(() => {
        // Only add event listeners if running in the browser
        if (typeof document !== 'undefined') {
            // Close the dropdown when clicking outside of it
            function handleClickOutside(event: MouseEvent) {
                if (!(event.target as HTMLElement | null)?.closest(".profile-pic, .dropdown-menu")) {
                    isDropdownOpen = false;
                }
            }

            document.addEventListener("click", handleClickOutside);

            // Cleanup event listener on destroy
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    });
</script>

<nav class="flex items-center justify-between p-1 bg-white text-black border-b-1 shadow-sm relative">
    <div class="flex items-center gap-10">
        <div class="logo mr-4">
            <img src={logoSrc} alt="Logo" class="h-10 ml-5" />
        </div>
        <div class="nav-links flex gap-14">
            <a href="#events" class="text-black hover:underline">Events</a>
            <a href="#organizations" class="text-black hover:underline">Organizations</a>
            <a href="#hours" class="text-black hover:underline">Hours</a>
            <a href="/CreateEvent" class="text-black hover:underline">Create Event</a>
        </div>
    </div>
    <div class="profile-pic relative">
        <button on:click={toggleDropdown} class="focus:outline-none">
            <img src={profilePicSrc} alt="Profile" class="h-8 w-8 mr-8 rounded-full object-cover" />
        </button>

        {#if isDropdownOpen}
            <div class="dropdown-menu absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
                <div class="p-4 flex items-center">
                    <img src={profilePicSrc} alt="Profile" class="h-12 w-12 rounded-full" />
                    <div class="ml-3">
                        <p class="text-gray-900 font-semibold">Jessy Chahal</p>
                        <p class="text-gray-600 text-sm truncate">jessychahal@gmail.com</p>
                    </div>
                </div>
                <div class="border-t border-gray-200"></div>
                <div class="py-2">
                    <a href="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        View Profile
                    </a>
                </div>
                <div class="py-2 flex justify-center">
                    <button class="w-40 px-4 py-2 text-center text-black font-semibold bg-primaryYellow rounded-lg">
                        Logout
                    </button>
                </div>
            </div>
        {/if}
    </div>
</nav>
