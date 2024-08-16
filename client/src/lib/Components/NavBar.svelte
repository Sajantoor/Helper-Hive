<script>
	export let logoSrc =
		'https://s3-alpha-sig.figma.com/img/a5d5/791e/2d61803c518e00731c64bb9fd71620c9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pS2Y5JaiXMuPshMuuwitJkHxvd8t-9blwWn5GX81-dc922Iu0zh0y0AzxbuSjyMAxlJohXQWM5wCZnoU1uw4XE8AbUcrarQ42lbJ6FLN7e5FNnEYtRMxAgMOye73Hm4TJ-beOA5FV2tQ1XN4bPXojIwSkpklSbsBWriFRmhbi8CLv0DqZmJv0WEzImKn62UIE49fflbFl16TgIjVE2ueRlQhW9BVYDCM8YhxmdeSX~16zrA2Lf8pNlzUze6d6ZzbQFqum3zvqa0M4mAEm9NzisIRCfcqlZIofW-7Z9zeEsxw~BMAu5u5hvtpEMVeuwTisb1NDgRCbzzVRKJWw6sMCA__'; // Replace with your logo path
	export let profilePicSrc = 'https://cdn-icons-png.freepik.com/512/4032/4032866.png'; // www.freepik.com
</script>

<nav class="flex items-center justify-between p-4 bg-white text-black border-b-2 shadow-sm">
	<div class="flex items-center gap-10">
		<div class="logo mr-4">
			<img src={logoSrc} alt="Logo" class="h-10 ml-5" />
		</div>
		<div class="nav-links flex gap-14">
			<a href="#events" class="text-black hover:underline">Events</a>
			<a href="#organizations" class="text-black hover:underline">Organizations</a>
		</div>
	</div>
	<div class="profile-pic">
		<img src={profilePicSrc} alt="Profile" class="h-10 w-10 mr-10 rounded-full object-cover" />
	</div>
</nav>
