# dirg

dirg is a grid library with minimal surface, for helping you use *correct* sizes
for both units and text based on a scale.

This is, in many ways, an implementation of
[Gridlover](http://www.gridlover.net/), but without providing a billion mixins
for what can be done just as aptly with one and a couple of functions.

### Download and install

1) Get the standalone library
[here](https://raw.githubusercontent.com/juliocesar/dirg/master/src/dirg.scss). Optionally get
[breakpoint](https://raw.githubusercontent.com/juliocesar/dirg/master/src/breakpoint.scss)
along.

2) Put both somewhere where your build can access the functions.

### Quick usage

Update the `$displays` variable at the top of the file with settings appropriate
for the design you’re implementing. I recommend using Gridlover for obtaining
these values, and then copying them over.

You can also add further entries to the map, and use that in conjunction with `breakpoint.scss`, like so:

    $dirg-scales: (
      default: (
        font-size: 14px,
        unit: 14px * 1.5,
        scale: 1.2
      ),
      small: (
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
          @include font-size(0, small);
        }
      }
    }

The above will load the `small` scale which uses different sizings, ideally more adequate for small displays.

Values in the scale aren’t restricted to pixels. You can run a scale based on viewport relative units, and have the implementation respond to resolution changes *while retaining* proportion and rhythm:

    $dirg-scales: (
      default: (
        font-size: 1.3vmax,
        unit: 1.3vmax * 1.4,
        scale: 1.3
      )
    );

The code written in the individual elements/components stays unchanged.

## API

`font-scale($x, [$scale = default])`: Returns a value to
be used on a `font-size`.

    .a-component {
      // …

      .heading {
        font-size: font-scale(3);
      }

      .paragraph {
        font-size: font-scale(1);
      }
    }

For the record, you should’t ever set a `font-size` without a `line-height`, but we’ll get to that later.

---
`units($x, [$scale = default])`: Returns the value for
`x` units of the grid. Use this for sizing things:

    .a-component {
      width: units(4);
    }

---
`columns($x, [$scale = default])`: Returns a column, which is the equivalent of <code>units(4)</code>. This is really just a shortcut, but it tends to make discussions sane by avoiding too high values passed to <code>units()</code> that are harder to reason about.

    .main-wrapper {
      width: columns(8);
    }

    // Elsewhere…
    .main-wrapper .login-pane {
      width: columns(2);
    }

    // And elsewhere
    .main-wrapper .content-wrapper {
      width: columns(6);
    }

---
`factor-diff($from: x, $to: y):` Returns the factor difference between two sizes. That’s handy when you want to transform, say, one font-size to the next using `transform`.

    .label {
      display: inline-block;
      transform-origin: left;
      vertical-align: bottom;
    }

    .label.label-a {
      @include font-size(5);
    }

    .label.label-b {
      transition: transform 1s ease-out;
      line-height: units(5);
      font-size: font-scale(1);

      &:hover {
        transform: scale(factor-diff($from: font-scale(1), $to: font-scale(5)));
      }
    }

---
`@include font-size($x, [$scale = default])`: A mixin for
making setting font sizes with a grid-valid line height value that can accommodate it.

    .a-component {
      .paragraph {
        @include font-size(1);
      }
    }

Most elements/components are sized vertically by the amount of text and/or other elements in them. This ensures they will grow in grid steps, and thus, correctly.

# The longer story

Designs that don’t use a grid **are fundamentally broken**. Using a grid, however, in the majority of cases is painful because silly bears insist on making whole frameworks out of it. Learning the grid system itself becomes a science. That’s nuts.

Rhythm and proportion are fundamental principles of UI building. These need to be orderly and based on a scale, which determines how things like text can grow or shrink.

A scale has a base font size value, a unit size that’s always equal or larger than it, and a variance factor.

The cente of the scale is `0`. You can move to `1` or greater or `-1` or lesser on the scale. The smaller the variance factor of the scale, the more fine grained variations you’ll get.

# License

MIT.
