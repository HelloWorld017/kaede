//Core
import Prism from "prismjs/components/prism-core";

// Basic Languages
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-ruby";

// Languages
import "prismjs/components/prism-actionscript";
import "prismjs/components/prism-ada";
import "prismjs/components/prism-apacheconf";
import "prismjs/components/prism-apl";
import "prismjs/components/prism-applescript";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-autohotkey";
import "prismjs/components/prism-autoit";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-basic";
import "prismjs/components/prism-batch";
import "prismjs/components/prism-bison";
import "prismjs/components/prism-brainfuck";
import "prismjs/components/prism-coffeescript";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-crystal";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-d";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-erlang";
import "prismjs/components/prism-fortran";
import "prismjs/components/prism-git";
import "prismjs/components/prism-glsl";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-groovy";
import "prismjs/components/prism-handlebars";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-http";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-julia";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-latex";
import "prismjs/components/prism-less";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-makefile";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-matlab";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-nix";
import "prismjs/components/prism-nsis";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-ocaml";
import "prismjs/components/prism-pascal";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-php";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-pug";
import "prismjs/components/prism-processing";
import "prismjs/components/prism-prolog";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-protobuf";
import "prismjs/components/prism-python";
import "prismjs/components/prism-r";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-rest";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-scheme";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-verilog";
import "prismjs/components/prism-vhdl";
import "prismjs/components/prism-vim";
import "prismjs/components/prism-wiki";
import "prismjs/components/prism-yaml";

// Themes
import "prismjs/themes/prism-okaidia.css";

// Plugins
import "prismjs/plugins/toolbar/prism-toolbar.js";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

Prism.manual = true;

export default function prism(content) {
	document.body.className += " line-numbers";

	const codes = [...content.querySelectorAll('code[class*="language-"]')];
	codes.forEach(code => {
		Prism.highlightElement(code);
	});

	const pres = [...content.querySelectorAll('pre[class*="language-"]')];
	pres.forEach(pre => {
		const langText = pre.className.split(' ').find(className => className.trim().startsWith('language-'));
		pre.setAttribute('data-lang', langText);
	});
}
