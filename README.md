# ninja-mqtt

Ninjablocks driver for passing sensor and actuator readings to and from
a MQTT broker.

## Motivation
The principle objective is to make Ninjablock sensor readings available
through a mechanism that in contrast to the Ninjablock cloud API is more
standard, commonly used, and can easily be self-hosted, including on the
Ninjablock itself. Eventually this should also allow to actuate devices
connected to the Ninjablock (including, for example, its eyes).

The goal is to achieve this through a Ninjablock device driver "plugin"
that can be dropped in (or removed again) without hacking, replacing, or
disabling the Ninjablock client or cloud.

## Related projects
Several projects with related motivations exist, including the following:
* [Ninjablock to local mqtt]. Requires [changes to Ninjablock client](https://github.com/ninjablocks/client/compare/develop...svrooij:cloud-gone).
  See "[Use Ninjablock without Ninjacloud]" forum post.
* [Ninjacape-mqtt-bridge] for integration with OpenHAB.

However, to my knowledge this is the only attempt aiming to establish
MQTT interoperability by means of a Ninjablock device driver, without
replacing or disabling the Ninjablock client or its other device drivers.

[Ninjablock to local mqtt]: https://gist.github.com/svrooij/2f83d790b3d74483e1ae
[Use Ninjablock without Ninjacloud]: https://discuss.ninjablocks.com/t/use-ninjablock-without-ninjacloud/4091
[Ninjacape-mqtt-bridge]: https://github.com/perrin7/ninjacape-mqtt-bridge/wiki
