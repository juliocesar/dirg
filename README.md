# dirg

dirg is a grid library with minimal surface, for helping you use *correct* sizes
for both units and text based on a scale.

This is, in many ways, an implementation of
[Gridlover](http://www.gridlover.net/), but without providing a billion mixins
for what can be done just as aptly with one and a couple of functions.

# Usage

Update the `$displays` variable at the top of the file with settings appropriate
for the design you’re implementing. I recommend using Gridlover for obtaining
these values, and then copying them over.

You can also add further entries to the map, and use that in conjunction with
`breakpoint.scss`, like so:

    $dirg-scales: (
      default: (
        font-size: 14px,
        unit: 14px * 1.5,
        scale: 1.2
      ),
      mobile: (
        font-size: 12px,
        unit: 12px * 1.35,
        scale: 1.25
      )
    );

    // And in another file
    .component {
      // …

      @include breakpoint(small) {
        .paragraph {
          @include font-size(0, mobile);
        }
      }
    }

The above will load the `mobile` scale which uses different sizings, ideally
more adequate for small displays.

Values in the scale aren’t restricted to pixels. You can run a scale based on
viewport relative units, and have the implementation respond to resolution
changes *while retaining* proportion and rhythm:

    $dirg-scales: (
      default: (
        font-size: 1.3vmax,
        unit: 1.3vmax * 1.4,
        scale: 1.3
      )
    );

The code written in the individual elements/components stays unchanged.

# License

MIT.
