# Birappa Mangoda :

* What is MQTT Protocol? 

MQTT /*(Message Queueing Telemetry Transport)*/ is a lightweight publish-subscribe messaging protocol designed for IoT (Internet of Things) and M2M (Machine to Machine) communication. It allows devices to send and receive messages (referred to as "publish" and "subscribe") through a central server (the "broker"). It was created in 1999 by IBM and is now an open standard maintained by the OASIS (Organization for the Advancement of Structured Information Standards) consortium.

In MQTT, clients can publish messages to a topic, and other clients can subscribe to the topic to receive the messages. The broker is responsible for delivering the messages from publishers to subscribers. The protocol has a simple and efficient design, making it well suited for use over low-bandwidth and high-latency networks, such as those commonly used in IoT applications.

The MQTT protocol defines a few key concepts:

Broker: The central server that manages the communication between clients.
Client: An entity that publishes messages to topics or subscribes to receive messages from topics.
Topic: A string that represents a specific message channel. Clients can publish or subscribe to a topic to send or receive messages.
Publish: An action by a client to send a message to a topic.
Subscribe: An action by a client to receive messages from a topic.
QoS (Quality of Service): A setting that controls the level of reliability for message delivery. There are three levels of QoS: 0, 1, and 2, with increasing levels of reliability.
The MQTT protocol has become popular for IoT and M2M communication because it is lightweight, efficient, and provides a simple and flexible way to exchange messages between devices.

/************************************************************************************************************************************************/


* What is WebSockets?

/*WebSockets*/ is a protocol that enables real-time, two-way communication between a client (such as a web browser) and a server. It provides a full-duplex communication channel over a single TCP connection, allowing for low latency communication between the client and server. This makes it suitable for a wide range of applications, such as online gaming, chat applications, and real-time data streaming.

Unlike traditional HTTP communication, which is limited to request-response interactions, WebSockets allow for continuous communication between the client and server.
WebSockets use a handshake mechanism to upgrade from an HTTP connection to a WebSockets connection, after which all communication is sent over the same socket.

The WebSockets protocol is implemented in most modern web browsers and web servers, making it widely supported and accessible to developers.
WebSockets can provide significant performance benefits compared to traditional methods such as long-polling, as it reduces the overhead of establishing a new connection for each request and response.
WebSockets use the same ports as HTTPS (port 443), which makes it easy to use in environments where only outbound HTTPS traffic is allowed.
WebSockets are designed to work over the same ports as HTTP and HTTPS, which makes them firewall-friendly and able to traverse most network configurations.