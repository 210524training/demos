# Event Propagation

It is how an event flows through the elements on a the page

There are two ways in which an element can propagate
- Bubbling
- Capturing

## Event Bubbling

Bubbling is the deafult event propagation
- Follows a buttom up approach
- The event starts at the target, then "bubbles" its way up the tree

## Event Capturing

Capture is the opposite of bubbling, instead of going from the target up, it will start at the top of tree and work its way to the target
- Top to bottom approach

Capturing only works with event handlers that are registered with .addEventListner() with the additional argument set to true

## Stopping Propagation

You can stop propagation in two different ways:

event.stopPropagation()
- Will stop the event propagation from the effects of bubbling
- This will only stop one handler, if there is multiple they will continue

event.stopImmediatePropagation()
- This will prevent all handlers on the current element from running

## The Event Object

In javascript events are represented by an Event Object

Even objects have the following properties and methods
- bubbles: a boolean value which indicates the propadation method, it is false by default
- currentTarget: a reference to the DOM element whose event listener triggered the specific even.
    - This is different from from the even that initially triggered the event as a single event can trigger multiple event listeners through propagation
- preventDefault(): cancels the event/prevents the default action of that event
- stopPropagation(): prevents the event from propagating further
- target: a reference to the DOM element that triggered the event
- timeStamp: the time of the event in miliseconds
- type: the type of the event

## Types of Events

There are several subclasses of the Event Object
- A complete list can be found here: https://www.w3schools.com/jsref/obj_events.asp

## Mouse Event

This is an event that is generated when the user interacts with elements on the page with the mouse

Events like click, onmouseenter, onmouseleave, will create a MouseEvent Object

The MouseEvent object has many properties that hold information about the state of the machine when the event occured, including:
- Coordinates of the mouse relative to the window: clientX and clientY
- Coordinates of the mouse relative to the last event: movementX and movementY
- Coordinates of the mouse relative to the target element: offsetX and offsetY
- Coordinates of the mouse relative to the the screen: screenX and screenY
- Whether alt, ctrl, or shift were hit during the event: altKey, ctrlKey, and shiftKey
- Which mouse button was hit: button, buttons and which

## KeyboardEvent

This is an event that is gernated when the user interacts with elements on the page with the keyboard

Events onkeydown, onkeypress, and onkeyup will create KeyboardEvent Objects

The KeyboardEvent object has many properties including:
- Whether alt, ctrl, or shift was hit during the event: altKey, ctrlKey, and shiftKey
- Which key was hit: key, keycode, and which
- Whether the key is being held down: repeat