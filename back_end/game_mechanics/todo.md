# Game Mechanics To-Do

* Figure out a way to simulate elapsed time
  * could store login time in DB
* Decide how much time it should take for a pet to:
  * starve (Zach you should not have this power)
  * get sick
* Let front end and database know exactly how you will store the data

**Be sure to keep all of your code local to this folder (for now)**


On login:
get user id from cookie
check new user true => tell chris if new user
Check elapsed time since prev login

check/update hunger/thirst levels from last login
- if either or <0 then pet is dead, update database pet is dead => tell chris if pet is dead


Random chance pet gets sick





Decide loss levels of food, water, play, medicine
- every hour hunger levels go down 1/72
- every hour thirst levels go down 1/24
- every hour mental-health levels go down 1/8
if food/water/play are below certain number => get sick becomes more likely

if sick
 - mult everything by 3




on logout:
record logout time


Tell derek:
- new user bool
- pet has:
  - int hunger
  - int thirst
  - int mental-health
  - int sickness
  - bool sick
  - alive
