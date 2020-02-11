# Kaede
Yet another neat ghost theme.

## Features
* Elaborately and carefully crafted.
* Supports CJK.
* Supports Outline feature.
* Supports Syntax Highlighting, LaTeX Mathematical Expressions.
* Supports built-in Like and Comments feature ([Kaede API Server](https://github.com/HelloWorld017/kaede-api) should be installed).
* Supports built-in Bookmark feature.

## Screenshots
<img src="https://i.imgur.com/RRtoHY3.png" alt="Top Screenshot" width="500px">
<img src="https://i.imgur.com/SaXXTOX.png" alt="Bottom Screenshot" width="500px">

You can view the full screenshot at [here](https://imgur.com/a/0MWieNy).  
Or you may visit [my blog](https://blog.nenw.dev)

## Installation
Download [Kaede in releases](https://github.com/HelloWorld017/kaede).  
To use Kaede, you should read `Configuration` section carefully and set some variables.

## Configuration
You can set up Kaede by adding `Code Injection`.
Please add script tag in the `Site Header` of `Code Injection` like this code and follow this guide.
```html
<script>
</script>
```

### API Integration
You should set up Ghost Integration in order to use this theme.

1. Please go to the `Integrations` section in Ghost Settings.  
2. Please click `Add custom integration` link. Name as `Kaede` and click next.  
3. Please copy the `Content API Key`.  
4. Set `$KaedeGhostApiKey` variable as the `Content API Key` like this.

```html
<script>
	window.$KaedeGhostApiKey = "YOUR CONTENT API KEY HERE";
</script>
```

#### Kaede API Integration
Also, Like and Comment features need the Kaede API Server to be running.  
If you don't need the feature, you may skip here.

1. Please install [Kaede API Server](https://github.com/HelloWorld017/kaede-api) using the Docker.
2. Set `$KaedeApiServer` as the server url like this.
```html
<script>
	// ... other configs
	window.$KaedeApiServer = "https://kaede.nenw.dev";
</script>
```

### Navigation
Kaede has two types of navigation. One is desktop navigation and the another is list navigation.

| ![Desktop Navigation](https://i.imgur.com/KIddzwd.png) | ![List Navigation](https://i.imgur.com/wgumxvO.png) |
|:------------------------------------------------------:|:---------------------------------------------------:|
| Desktop Navigation                                     | List Navigation                                     |

As you can see, the desktop navigation should be kept as small as possible because it can overflow on small screen.
(Actually, it is hidden on mobile devices.)

The desktop navigation is retrieved from ghost `Navigation` settings.  
And the list navigation is retrieved from `$KaedeFullNavigation` if possible. Otherwise, it is same as the desktop navigation.

The list navigation of the screenshot is from this code:
```js
window.$KaedeFullNavigation = [
	{ label: "홈", url: "/" },
	{ label: "네누 개발생활" },
	{ label: "개발", url: "/tags/development", children: [
		{ label: "웹", url: "/tags/web" },
		{ label: "작업", url: "/tags/works" }
	] },
	{ label: "네누 개인생활" },
	{ label: "일상", url: "/tags/nichijou", children: [
		{ label: "여행", url: "/tags/travel", children: [
			{ label: "일본 여행", url: "/tags/travel-to-japan" }
		] },
		{ label: "취미", children: [
			{ label: "애니", url: "/tags/anime" },
			{ label: "우타이테", url: "/tags/utaite" }
		] }
	] },
	{ label: "게임", children: [
		{ label: "마인크래프트", url: "/tags/minecraft" }
	] }
];
```

As you can notice, the `$KaedeFullNavigation` is array of items.  
Each item has `label`, `url` (optional) and `children` (optional) properties.  
The `children` is also array of items.

TL;DR)
```
Item:
	label: string
	url?: string
	children?: Item[]
```

### Options
There are other options you can edit.

| Option Name              | Description                                                                               |
|--------------------------|-------------------------------------------------------------------------------------------|
| $KaedeGhostApiKey        | **necessary** API Key of ghost. For detail, please refer to *API Integration* section.    |
| $KaedeApiServer          | URL of Kaede Api Server                                                                   |
| $KaedeBookmarkEnabled    | If this value is true, the bookmark feature is enabled.                                   |
| $KaedeCommentsMaxAuthor  | Maximum length of author name in comments.                                                |
| $KaedeCommentsMaxContent | Maximum length of content of comments.                                                    |
| $KaedeFullNavigation     | Navigation of ghost blog. For detail, please refer to *Navigation* section.               |

## Styling
You can customize default Kaede settings by modifying CSS variable.
Kaede settings are editable via `Code Injection` in Ghost settings.

### Font
1. Find your desired font in [Google Fonts](https://fonts.google.com) and add `Embed Font` section in `Code Injection` header.  
2. Remember the `font-family` in `Specify in CSS` section.
3. Add following code to the `Code Injection` header. (You should override with `!important` as css files are lazy loaded.)
```html
<style>
	:root {
		--font-ui: "YOUR UI FONT HERE", sans-serif !important;
		--font-title: "YOUR TITLE FONT HERE", sans-serif !important;
		--font-sans: "YOUR SANS-SERIF FONT HERE", sans-serif !important;
		--font-content: "YOUR CONTENT FONT HERE", sans-serif !important;
		--font-content-title: "YOUR CONTENT-TITLE FONT HERE", sans-serif !important;
		--font-code: "YOUR CODE FONT HERE", monospace !important;
	}
</style>
```
4. Replace the texts into `font-family` name of your desired font.

### Colors
**WARNING:** This is **NOT RECOMMENDED** to change `grey` and `background` colors as some colors are not updated well.  
There are some variables for colors. You can change it into your desired color.
```html
<style>
	:root {
		--foreground-400: #35aba4 !important;

		--background-400: #efebdd !important;

		--red-300: darken(#eb5757, 5%) !important;
		--red-400: #eb5757 !important;
		--red-500: lighten(#eb5757, 5%) !important;

		--grey-050: #000000 !important;
		--grey-100: #202020 !important;
		--grey-200: #3b3b3b !important;
		--grey-700: #cacaca !important;
		--grey-850: #f1f2f3 !important;
		--grey-900: #ffffff !important;
	}
</style>
```
