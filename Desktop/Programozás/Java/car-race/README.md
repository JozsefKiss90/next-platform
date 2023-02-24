# Car Race

## This is a guided project

To learn the most, try and implement it on your own first, and check the solution only when you feel necessary. However, if you feel completely stuck, feel free to check the [step-by-step solution guide](https://journey.study/v2/learn/materials/pages/guides/car-race--java.md)

Your task is to simulate a race. You need to create 10 cars, 10 trucks, 10 motorcycles, and race them for 50 hours. After simulating the race, print the results.

## What are you going to learn?

- Write a simulation with many objects.
- Design the way the states of objects evolve and the way they "communicate" with each other.
- Use inheritance and composition.
- Use random values.

## Tasks
### Set up race
Set all the participants, constants, and random elements needed to start the race.
1. The race itself, 10 cars, 10 trucks, and 10 motorcycles are created in the main method.


### Race
The race object must store all the racers, and also allow the user to register them from outside. One race lasts 50 hours.
    - Register a car, a truck, or a motorcycle into the race with a method named `registerRacer()`.
    - Race simulation can be done by `simulateRace()`. It does the following.
        - Call `moveForAnHour()` on every vehicle 50 times.
        - Set whether it is raining for every hour.
    - The `printRaceResults()` method prints the name, the traveled distance, and the type of each vehicle.
    - It is possible to check if there is an active yellow flag for the current hour of the race, using `boolean` `isYellowFlagActive()`. It returns `true` when there is a broken truck on the track.


### Weather
Implement an ability to check the weather during the current hour of the race and set a new random weather for the next hour.
    - The `advance()` method sets the weather with a 30% chance to rain.
    - The `isRaining()` method returns `true` if it is currently raining.


### Car
Cars are vehicles with personality so they have imaginative names. Create a list of possible names on http://www.fantasynamegenerators.com/car-names.php, and pick two at random for each instance. Cars need to be careful and slow down when there is a broken truck on the race tracks.
    - The `name` property stores the name of the car, which comprises two random words form the list of names.
    - The `normalSpeed` property stores the normal speed of the car, which is set to a random number between 80 and 110 km/h in the constructor.
    - The actual speed of the car for the current hour is stored in `actualSpeed`. If there is a yellow flag, limit the speed of car to 75 km/h, otherwise, use the value of `normalSpeed`.
    - The `distanceTraveled` property stores the summarized distance traveled in the race so far.
    - The `prepareForLap()` method is used for setting up the actual speed on the current lap.
    - One hour of racing is simulated with the `moveForAnHour()` method. The car travels for an hour, increasing the distance traveled.


### Motorcycle
Motorcycles are pretty fast but making turns in rain is dangerous, so they have to slow down in bad weather conditions. They do not care about broken down trucks.
    - The motorcycles are named "Motorcycle 1", "Motorcycle 2", "Motorcycle 3", and so on. This is a unique value, based on the creation order, and stored in the `name` property.
    - The actual speed of the motorcycle for the current hour is stored in `actualSpeed`. Normally, the speed is 100 km/h. During rain, motorcycles slow down by a random value between 5 and 50 km/h.
    - The `distanceTraveled` property holds the summarized distance traveled in the race so far.
    - The `prepareForLap()` method is used for setting up the actual speed on the current lap.
    - One hour of racing is simulated with the `moveForAnHour` method. The motorcycle travels for an hour, increasing the distance traveled.


### Truck
Trucks are real powerhouses but their intricate engines are prone to failure. When they break down, they have to stop for a while to repair the engine.
    - The actual speed of the vehicle for the current race hour is stored in `actualSpeed`. The speed of a truck is 100 km/h or 0 when broken down.
    - The `name` property stores the name. Truck drivers are boring, they name their trucks random numbers between 0 and 1000.
    - The `distanceTraveled` property holds the summarized distance traveled in the race so far.
    - The `prepareForLap()` method is used for setting up the actual speed on the current lap. Trucks have a 5% chance of breaking down for 2 hours.
    -   When a truck is broken down, it cannot break down again during the reparation.
    - One hour of racing is simulated with the `moveForAnHour` method. The truck travels for an hour, increasing the distance traveled.


## Hints
Noticed that `Car`, `Motorcycle` and `Truck` share some similarities. Use inheritance to abstract away the common parts.
Use the built-in `Random` class to generate random numbers. Implement a custom utility class around it, if you find it useful.
The actual speed of a vehicle sometimes depends on the state of other vehicles or on contextual features, such as the weather. But we cannot set their speed from the outside, since the speed setting logic needs to be encapsulated into the vehicle classes. How, then, can a specific vehicle get to such contextual information? Think about this in terms of necessary communication between objects!

## Background materials
- [Creating objects](https://journey.study/v2/learn/materials/pages/java/creating-objects.md)
- [Methods](https://journey.study/v2/learn/materials/pages/java/methods.md)
- [OOP basics](https://journey.study/v2/learn/materials/pages/java/basics-of-object-oriented-programming.md)
- [OOP basics 2](https://journey.study/v2/learn/materials/pages/java/basics-of-object-oriented-programming-with-java-part-2.md)
- [Collections](https://journey.study/v2/learn/materials/competencies/java-data-structures/java-collections.md)
- [Abstraction, abstract classes and interfaces](https://journey.study/v2/learn/materials/pages/java/abstraction.md)
- [A step-by-step solution guide](https://journey.study/v2/learn/materials/pages/guides/car-race--java.md)


