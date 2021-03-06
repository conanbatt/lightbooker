### Basic Boilerplate to setup Next as fast as possible ###

npm install
npm run dev PORT=XXXX

## Tools ##

  Next.js https://github.com/zeit/next.js/

Next is a framework to do server-side rendering react for front-end apps that consume apis.
Other libraries used are moment.js and react slider for the time ranges.

## Product Decisions ##

The drawings provided explained an idea for the design. Had I not seen those images, I would've chosen to go through the Google Calendar design, which allows for a finer grained control. However, it would have also been a difficult implementation, so I decided to follow more or less the requirements.

I did deviate in a couple of things:

* Did not like the moving parts of showing images on toggle, or designing around several images. The image should only be to recognize the room, so I expect a single image is enough.

* I did not use dropdown animations to show booking or more details for two reasons: the first is that dropdown is not one of the smoothest css animations, so I generally avoid it. Another is that animations that dont add for the experience, substract. A B2B product like this that will be used by professionals of varying ages and visual impairments and tastes does not need superfluous animations. This is merely an opinion reinforcing that when I tried a few, I just didnt like how they fit into this.

* I did not implement the "next meetings" filter, but implemented a smarter filter that allows you to write different criteria, including a time, which is more fine grained than a simple filter checkbox.

## TODOS ##

Working on a problem with a tight deadline is bound to create some debt. I realized that normalizing times and timezones was harder than just simple conversions. I would separate the logic for that and abstract the sliders and the time pickers into a single type of unit. Right now, its sometimes converted to minutes, then to times and operated on in different formats.

The color pallete is fine, but the site is a bit too cheerful! It lacks the soberness of enterprise.

Icons: there are several icons I would replace (arrows, slider pickers).