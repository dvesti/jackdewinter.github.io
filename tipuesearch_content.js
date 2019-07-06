var tipuesearch = {"pages":[{"title":"About me","text":"This is me.","tags":"pages","url":"https://jackdewinter.github.io/pages/about-me.html","loc":"https://jackdewinter.github.io/pages/about-me.html"},{"title":"Starting With GitHub: Setting Up Credentials","text":"Introduction In setting up this website, I needed to make sure I had Git 1 and more specifically GitHub 2 setup to use GitHub's GitHub Pages 3 feature. My source control tool of choice was already Git, so it made sense to make my website platform of choice GitHub Pages 3 . I made this choice to ensure that I can write articles with no changes to my normal workflows. It is a high priority for me to make sure that any Git access is secure and follows best common practices on security, so adding secure access to GitHub was a pretty easy decision. This article details the actions and choices I made setting up my access to GitHub for my blog. It details how I followed the GitHub Pages 3 instructions for create a personal website, creating a personal repository on GitHub to host the pages. Then it describes the two modes of accessing GitHub, SSH and HTTPS, and why I chose SSH. Finally, it provides detailed notes on how I generated a SSH keypair specifically for GitHub, and configured both my local Git and the remote GitHub to use them. Getting Started With GitHub There are many good articles out there on how to install Git for different operating systems, so I won't repeat that information here. Setting up access to GitHub is also easy as the folks at GitHub have provided excellent instructions. Simply go to the GitHub Home Page and it will either allow you to login if you have an account, or create a new account if you don't. As I had already dealt with a couple of open source projects, I already have an account jackdewinter , so I logged in without any issues. After I logged in, the browser deposited me on my home page. From there I was able to see any projects that I had either contributed to or filed an issue against. Just starting in my Open Source journey, the contents were only a couple of projects that I had filed issues with. Prior to this point, there was no need to authenticate my Git client with GitHub as I was just downloading from public repositories. I figured out quickly that setting up my own website would require my own repositories, so I determined that authentication would also be required. Creating My First GitHub Repository The GitHub Pages home page has a really simple formula on their web page for setting up personal web pages. Step 1 was pretty easy: I made sure that that the name of the repository was my GitHub user id (in my case jackdewinter ) followed by .github.io . When the creation of my repository finished, GitHub deposited my browser at the base of my new repository: jackdewinter/jackdewinter.github.io . The remaining steps in the formula dealt with cloning the repository, defining a sample index.html file for my website, and pushing that code back to the repository. While I was familiar with those concepts, any time I forget something I refer to the Git Basics documentation on the Git website. From there I can usually find the correct helper article on what I need to accomplish within 2-3 clicks. The new concept that I had to deal with on the GitHub site is that unlike before, I was now accessing a repository that was privately owned that I wanted to write to. Unless you mark a repository as private, everyone can see that repository and read from that repository. My website's repository is public, so reading wasn't a problem. Pushing the code back to the my repository would be a write, and was a problem. Each project has a list of who can write to it and the creator of the project is on that list by default. But to write to the project, I had to have my local Git tool login to GitHub when needed and authenticate. I was going to have to dive into credentials. Proofed to here GitHub Authentication: SSH vs HTTPS Every time you log in to a website or to a program by using your user id and password, you are establishing your credentials. You tell the website or program ‘I am me, let me see my stuff!'. GitHub is no different that any of those sites. If you want to be able to see any of your private stuff or write to your stuff, it needs to make sure you are you. Going to the GitHub Authenticating Page , there are two choices that allow us to connect to GitHub: HTTPS or SSH. Both of these are valid options, which allow for enhanced security when having Git connect to GitHub. What it breaks down to is the following: SSH HTTPS x y SSH - set up keys SSH - setup is more involved SSH - more secure Https - set up credential manager Https - less likely blocked by firewall Looking into this, I decided to go with SSH, as I wanted to opt for more security. After I performed some research at the GitHub site, I found this very good page on SSH over the HTTPS port . In it, they explain that there is a simple test to see if SSH will work from your system to GitHub. When you execute the following command: ssh -T git@github.com it will either return one of two responses. If it returns with: > Hi *username*! You've successfully authenticated, but GitHub does not provide shell access. then you can access GitHub via SSH without any issues. If you see the other response: > ssh: connect to host github.com port 22: Connection timed out then you have to setup SSH to connect to GitHub over the SSH port. This can be checked with a small modification to the above command: ssh -T -p 443 git@ssh.github.com The command is now trying to establish a SSH session over port 443, and if you get the You've successfully response, it's working fine. Running these tests myself, I found that I got a timeout on the first command and a success on the second command. Following the article, it recommends changes ~/.ssh/config to include the following: Host github.com Hostname ssh.github.com Port 443 My primary system is a Windows 10 machine, so instead of modifying ~/.ssh/config , I modified the %HOMEDRIVE%%HOMEPATH%\\.ssh\\config . This time, when I executed the ssh -T git@github.com command, the response was successful. Now I was ready to set up the SSH keys. Unique SSH Keys Going back to the page GitHub Authenticating Page , the next step is to generate a new SSH key and add it to our local SSH keyring. The page that it points to on generating a new key is pretty detailed, so I won't try and improve over GitHub's work. If you already have a key generated, it is assumed that you can reuse that key for GitHub. I do want to talk about that practice. Having a bit of a security background from my day job, I understand that you want to limit exposure if something gets broken. Just from a quick search, there are articles by Leo Notenboom , Malware Bytes Labs , and WikiHow that all describe how you should have different passwords for each account, and in many cases, use a password manager. And to be honest, that was just the first 3 that I clicked on. There were a lot more. I can sum up and paraphrase the justification raised in each of those articles by posing a single question: If someone breaks your password on one site, what is your exposure? If you have one password for all sites, then whoever breaks your password has access to that one site. If you have a different password for each site, the damage is limited to that one site. In my mind, using a public key for credentials is a similar concept to using a user-id and password for credentials. Therefore, it followed that if I follow good security practices for passwords, I should also follow the same practices for key credentials. Generating a New Key For GitHub To ensure I have secure access to GitHub, I followed the instructions for generating a new key . To generate a distinct key for GitHub, I made one small modification to the instructions: I saved the new key information with the filename github-key instead of the default id_ras . With that change in place, I followed the remaining instructions for setting up ssh-agent and uploading the key information to GitHub, replacing any occurrence of id_ras with github-key . With those steps accomplished, I had a specific key for GitHub and I had it registered locally. I also had setup GitHub with the public portion of the credentials, as instructed. The only remaining step was ensure that any SSH connections to GitHub would use the GitHub credentials. Doing a bit more research on the SSH configuration files, I quickly found that there was built in support for this by adding the following to my ~/.ssh/config file: Host github.com User git PreferredAuthentications publickey IdentityFile /c/Users/jackd/.ssh/github-key Combined with the change from earlier in this article, my ~/.ssh/config file now looked like: Host github.com Hostname ssh.github.com Port 443 User git PreferredAuthentications publickey IdentityFile /c/Users/jackd/.ssh/github-key I performed a number of thorough tests, and everything passed without any issues! What Was Accomplished Part of any project, private or open-source, is setting up a version control system and secure access to that system. This article details the actions and choices I made setting up my access to GitHub for my blog. It details how I followed the GitHub Pages 3 instructions for create a personal website, creating a personal repository on GitHub to host the pages. Then it describes the two modes of accessing GitHub, SSH and HTTPS, and why I chose SSH. Finally, it provides detailed notes on how I generated a SSH keypair specifically for GitHub, and configured both my local Git and the remote GitHub to use them. Git is an open-source source control tool. For more information, look here . ↩ GitHub is a common repository for open-source projects. For more information, look here . ↩ GitHub Pages are a feature of GitHub that allow people to host their personal websites on GitHub. For more information, look here . ↩ ↩ ↩ ↩","tags":"GitHub","url":"https://jackdewinter.github.io/2019/07/24/starting-with-github-setting-up-credentials/","loc":"https://jackdewinter.github.io/2019/07/24/starting-with-github-setting-up-credentials/"},{"title":"Extended Markdown Examples","text":"This is a continuation of the previous cheat sheet for my website. This article specifically addresses any extensions that are not part of the base Markdown specification. Each section here represents an extension that I have enabled on my website. The formatting from the previous page is continued, with one small exception. The title of each section specifies the name of the extension instead of the name of the feature being documented (see Admonitions ). If an extension contains more than one feature, such as the Extra extension, the title specifies the name of the extension, a dash, and the name of the feature (see Footnotes ). Introduction The authors of the Python Markdown Package anticipated the addition of extra features. To ensure people would have choice, the base package can be extended using configuration . The Markdown extensions have been activated on my website by inserting the following text into my peliconconf.py: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 MARKDOWN = { 'extension_configs' : { 'markdown.extensions.extra' : {}, 'markdown.extensions.admonition' : {}, 'markdown.extensions.codehilite' : { 'css_class' : 'highlight' }, 'markdown.extensions.meta' : {}, 'smarty' : { 'smart_angled_quotes' : 'true' }, 'markdown.extensions.toc' : { 'permalink' : 'true' }, } } Table Of Contents [TOC] Introduction Table Of Contents CodeHilite - Code Blocks With Line Numbers Extra - Footnotes Extra - Abbreviations Extra - Definition Lists Smartypants Admonitions CodeHilite - Code Blocks With Line Numbers ``` #!python # Code goes here ... ``` 1 # Code goes here ... Extra - Footnotes Here's a simple footnote,[&#94;1] and here's a longer one.[&#94;bignote] [&#94;1]: This is the first footnote. [&#94;bignote]: Here's one with multiple paragraphs and code. Here's a simple footnote, 1 and here's a longer one. 2 Extra - Abbreviations The HTML specification is maintained by the W3C. *[HTML]: Hyper Text Markup Language *[W3C]: World Wide Web Consortium The HTML specification is maintained by the W3C . Extra - Definition Lists Apple : Pomaceous fruit of plants of the genus Malus in the family Rosaceae. Orange : The fruit of an evergreen tree of the genus Citrus. Apple Pomaceous fruit of plants of the genus Malus in the family Rosaceae. Orange The fruit of an evergreen tree of the genus Citrus. Smartypants advantage is that code blocks are unaffected - apostrophe ' by itself - apostrophe as in 'quote me' - quotations mark \" by itself - quotations mark as in \"quote me\" - replacement of multi-character sequences with Unicode: << ... -- >> --- apostrophe ‘ by itself apostrophe as in ‘quote me' quotations mark \" by itself quotations mark as in \"quote me\" replacement of multi-character sequences with Unicode: « … – » — Admonitions broken down into section by the way that the Elegant theme colors the admonitions !!! note You should note that the title will be automatically capitalized. Note You should note that the title will be automatically capitalized. !!! important \"Replacement Title\" You should note that the default title will be replaced. Replacement Title You should note that the default title will be replaced. !!! hint You should note that the title will be automatically capitalized. Hint You should note that the title will be automatically capitalized. !!! tip \"Replacement Title\" You should note that the default title will be replaced. Replacement Title You should note that the default title will be replaced. !!! warning You should note that the title will be automatically capitalized. Warning You should note that the title will be automatically capitalized. !!! caution \"Replacement Title\" You should note that the default title will be replaced. Replacement Title You should note that the default title will be replaced. !!! attention \"\" You should note that this will have no title due to the empty title. You should note that this will have no title due to the empty title. !!! danger You should note that the title will be automatically capitalized. Danger You should note that the title will be automatically capitalized. !!! error \"Replacement Title\" You should note that the default title will be replaced. Replacement Title You should note that the default title will be replaced. This is the first footnote. ↩ Here's one with multiple paragraphs and code. ↩","tags":"Markdown","url":"https://jackdewinter.github.io/2019/06/30/extended-markdown-examples/","loc":"https://jackdewinter.github.io/2019/06/30/extended-markdown-examples/"},{"title":"Standard Markdown Examples","text":"As I started writing my articles for my blog, I realized I needed something. To help me write articles using this flavor of Markdown 1 , I needed my own cheat sheet. My hope is that it provides clear guidance on which aspects of the various forms of Markdown worked for me, and which didn't. Introduction Horizontal Break Headings Text Emphasis Numbered lists Bulleted List Block quote Code Block Tables Links Local Links Remote Links Download Links ) Images Introduction I am writing articles and pages on Pelican 4.0.1 2 using the Elegant 3 theme, therefore I want to make sure I have a cheat sheet that is specific to this dialect of Markdown. The base Markdown used for Pelican uses the Python Markdown Package which (with 3 exceptions) follows John Gruber's Markdown definition very literally. Pelican configuration also supports providing Markdown with additional configuration that enables other features. Those features are documented separately in the next page . The format of this cheat sheet is simple. Each section is separated from the next with a horizontal break and the name of the section. Any notes regarding that section are placed at the top of the section in point form, to ensure they are brief. Then a Code Block section is used to show the literal code used to produce the effects that are presented right after the code block. Horizontal Break A horizontal break occurs after 3 or more hyphens. --- A horizontal break occurs after 3 or more hyphens. Headings # Heading Level 1 ## Heading Level 2 ### Heading Level 3 Heading Level 1 Heading Level 2 Heading Level 3 Text Emphasis two spaces at the end of a line will be equivalent to <br/> This text is **bold** and this text is also __bold__. This text is *italic* and this text is also _italic_. This text is **_italic and bold_**, but no two spaces at end. Single ```line``` block. Inline `code` has ```back-ticks like this ` around``` it. This text is bold and this text is also bold . This text is italic and this text is also italic . This text is italic and bold , but no two spaces at end. Single line block. Inline code has back-ticks like this ` around it. Numbered lists to maintain the indentation, place 4 spaces at the start of the line 1. One New para. Blah 2. Two - unordered - list 3. Three 1. ordered 2. list - unordered - list 3. items One New para. Blah Two unordered list Three ordered list unordered list items Bulleted List to maintain the indentation, place 4 spaces at the start of the line - This is a list item with two paragraphs. This is the second paragraph in the list item. You're only required to indent the first line. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. - Another item in the same list. - Bulleted item - Bulleted item This is a list item with two paragraphs. This is the second paragraph in the list item. You're only required to indent the first line. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Another item in the same list. Bulleted item Bulleted item Block quote > This is the first paragraph of a blockquote with two paragraphs. > Lorem ipsum dolor sit amet, > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. > > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. > > This is the first level of quoting. > > > This is nested blockquote. > > Back to the first level. This is the first paragraph of a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. This is the first level of quoting. This is nested blockquote. Back to the first level. Code Block line numbers can be added via extensions ```text Make things only as complex as they need to be. ``` ```Python # Blogroll LINKS = ( ('Pelican', 'Pelican', 'http://getpelican.com/'), ) ``` Make things only as complex as they need to be. # Blogroll LINKS = ( ( 'Pelican' , 'Pelican' , 'http://getpelican.com/' ), ) Tables colons can be used to align columns. | Column1 | Column 2 | Column 3 |---|---|---| | Value 1 | Value 2 | Value 3 | | Value 4 | Value 5 | Value 6 | | Value 7 | Value 8 | Value 9 | | Tables | Are | Cool | | ------------- |:-------------:| -----:| | col 3 is | right-aligned | $1600 | | col 2 is | centered | $12 | | zebra stripes | are neat | $1 | Column1 Column 2 Column 3 Value 1 Value 2 Value 3 Value 4 Value 5 Value 6 Value 7 Value 8 Value 9 Tables Are Cool col 3 is right-aligned $1600 col 2 is centered $12 zebra stripes are neat $1 Links Local Links {filename} tag indicates location in the content folder. [About Page]({filename}/pages/about.md) About Page Remote Links proper URL indicates a remote website [Python Package Index](https://pypi.org) Python Package Index Download Links download links are not natively supported in Markdown must explicitly create HTML text inline to achieve that Creating a link to a file to download, not display, is not natively supported in markdown. [Pelican Brag Document (display)]({filename}/images/markdown-1/pelican.txt) <a href=\"{filename}/images/pelican.txt\" download>Pelican Brag Document (download)</a> Pelican Brag Document (display) Pelican Brag Document (download) Images {filename} tag indicates location in the content folder. ![python logo]({filename}/images/markdown-1/python_icon.png) Markdown allows for HTML pages to be written using a simple text editor with no knowledge of HTML. ↩ Pelican is a Static Site Generator written in Python. ↩ The Elegant theme's repository is here . ↩","tags":"Markdown","url":"https://jackdewinter.github.io/2019/06/29/standard-markdown-examples/","loc":"https://jackdewinter.github.io/2019/06/29/standard-markdown-examples/"},{"title":"My Long Article","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada sed tortor et pulvinar. Donec a vehicula ligula. Quisque porta erat vitae lectus lacinia varius. Integer sed lacus in libero volutpat lobortis ac vitae velit. Praesent rutrum turpis sem, id mattis sem pulvinar id. Morbi leo felis, facilisis in ex a, viverra placerat justo. Donec ac risus non sapien feugiat malesuada. Para 1 Donec quam neque, vulputate quis purus at, tempus tincidunt neque. Sed posuere eros eu massa lobortis varius. Ut condimentum elit eros. Sed vel nunc vitae nibh aliquet vestibulum vitae quis justo. Sed vel ligula turpis. Aliquam et mi mollis, suscipit sapien vel, molestie enim. Morbi sodales, dui nec congue tristique, risus mi luctus nulla, vel egestas sem nulla quis augue. Nulla vitae efficitur odio, quis egestas ex. Pellentesque a est viverra, fringilla dui ac, laoreet purus. Suspendisse porta aliquet nunc et pulvinar. Integer ante felis, tincidunt eu ipsum a, imperdiet convallis augue. Cras vulputate sapien sit amet metus placerat, sed congue turpis tempus. Nunc pretium ac dolor eget tincidunt. Para 2 Nunc id tortor lectus. Quisque fermentum sem ut elit ultricies sollicitudin. Curabitur blandit, elit at suscipit mattis, purus lectus eleifend felis, id rutrum neque sapien vitae arcu. Aenean elementum lacus tristique purus facilisis placerat. Nunc pharetra lorem ut finibus blandit. Aenean scelerisque elit nec malesuada accumsan. Proin eu orci eget odio scelerisque viverra a ac nulla. Vestibulum elementum lobortis quam. Morbi porta rutrum mi, quis laoreet nunc dictum at. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut in lobortis massa. Para 2a Phasellus et leo in nunc fermentum vulputate. Nullam sed interdum augue. Duis eu dignissim eros. Mauris pretium turpis non purus porta, non consequat enim rutrum. Fusce dui odio, consequat in rhoncus sed, interdum vulputate quam. Nullam nec dolor ex. Curabitur dapibus vestibulum odio at sodales. Para 2b Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum. Etiam dignissim lorem at turpis suscipit pharetra. Ut velit velit, pellentesque sit amet ex sed, efficitur laoreet enim. Etiam pharetra neque quam, in elementum massa molestie vel. Duis nec venenatis nisi. Etiam condimentum, leo vel ultrices placerat, dolor nibh pretium tortor, vel egestas odio nulla ut lectus. Etiam ultrices nulla quis felis tincidunt, quis sollicitudin elit lacinia. Suspendisse porttitor nulla rhoncus est blandit, eu faucibus lacus vestibulum.","tags":"Python, Fred","url":"https://jackdewinter.github.io/2010/12/03/my-super-long-post/","loc":"https://jackdewinter.github.io/2010/12/03/my-super-long-post/"},{"title":"My Short Article","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada sed tortor et pulvinar. Donec a vehicula ligula. Quisque porta erat vitae lectus lacinia varius. Integer sed lacus in libero volutpat lobortis ac vitae velit. Praesent rutrum turpis sem, id mattis sem pulvinar id. Morbi leo felis, facilisis in ex a, viverra placerat justo. Donec ac risus non sapien feugiat malesuada.","tags":"Python, Fred","url":"https://jackdewinter.github.io/2010/12/03/my-super-short-post/","loc":"https://jackdewinter.github.io/2010/12/03/my-super-short-post/"}]};