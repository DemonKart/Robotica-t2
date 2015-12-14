import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Random;
import java.util.Vector;

public class Main {
	
	static Vector<Point> points = new Vector<Point>();
	static Vector<Point> mapPoints = new Vector<Point>();
	
	public static void main(String[] args) throws IOException {
		String[] lines = readLines(System.in);
		char[][] maze = toMatrix(lines);
		Point begin = searchBegin(maze);
		Point end = searchEnd(maze);
		solveMaze(maze, begin, end);
		points = solveCinematica(points);
		getMapPoints(maze);
				
		PrintWriter writer = new PrintWriter("input.js", "UTF-8");
		writer.write("var points=[");
		for (int i = 0; i < points.size(); i++) {
			writer.write(points.get(i).toString());
			if (i < points.size()-1) {
				writer.write(",");
			}
		}
		writer.write("]");
		writer.write("\n");
		writer.write("var mapPoints=[");
		for (int i = 0; i < mapPoints.size(); i++) {
			writer.write(mapPoints.get(i).toString());
			if (i < mapPoints.size()-1) {
				writer.write(",");
			}
		}
		writer.write("]");
		
		writer.close();
//		for (Point p : points) {
//			System.out.println(((int)p.getX()*50)+"\t"+((int)p.getY()*50));
//		}

//		String[] solvedLines = fromMatrix(maze);
//		for (int i = 0; i < solvedLines.length; i++)
//			System.out.println(solvedLines[i]);
	}
	
	private static String[] readLines(InputStream f) throws IOException {
		BufferedReader r = new BufferedReader(new InputStreamReader(f,"US-ASCII"));
		ArrayList<String> lines = new ArrayList<String>();
		String line;
		while (((line = r.readLine()) != null)&&(!line.equals("final")))
			lines.add(line);
		return lines.toArray(new String[0]);
	}

	private static char[][] toMatrix(String[] lines) {
		char[][] c = new char[lines.length][lines[0].length()];
		for (int i = 0; i < lines.length; i++)
			for (int j = 0; j < lines[i].length(); j++) {
				c[i][j] = lines[i].charAt(j);
			}
		return c;
	}

	private static boolean solveMazeRecursively(char[][] maze, int x, int y, int xFinal, int yFinal, int d) {
		boolean ok = false;
		for (int i = 0; i < 4 && !ok; i++)
			if (i != d)
				switch (i) {
				case 0:
					if (maze[y - 1][x] == ' ')
						ok = solveMazeRecursively(maze, x, y - 2, xFinal, yFinal, 2);
					break;
				case 1:
					if (maze[y][x + 1] == ' ')
						ok = solveMazeRecursively(maze, x + 2, y, xFinal, yFinal, 3);
					break;
				case 2:
					if (maze[y + 1][x] == ' ')
						ok = solveMazeRecursively(maze, x, y + 2, xFinal, yFinal, 0);
					break;
				case 3:
					if (maze[y][x - 1] == ' ')
						ok = solveMazeRecursively(maze, x - 2, y, xFinal, yFinal, 1);
					break;
				}
		// verificar condicao
		if (x == xFinal && y == yFinal)
			ok = true;
		if (ok) {
			Random r = new Random();
			int t;
			if (!points.isEmpty()) {
				t = r.nextInt(15)+1;
				Point p = points.lastElement();
				int lastT = (int) p.getT();
				t += lastT;
			} else {
				t = 0;
			}
			points.addElement(new Point(x, y, t));
			maze[y][x] = '*';
			switch (d) {
			case 0:
				if (!points.isEmpty()) {
					t = r.nextInt(15)+1;
					Point p = points.lastElement();
					int lastT = (int) p.getT();
					t += lastT;
				} else {
					t = 0;
				}
				points.addElement(new Point(x, y-1, t));
				maze[y - 1][x] = '*';
				break;
			case 1:
				if (!points.isEmpty()) {
					t = r.nextInt(15)+1;
					Point p = points.lastElement();
					int lastT = (int) p.getT();
					t += lastT;
				} else {
					t = 0;
				}
				points.addElement(new Point(x+1, y, t));
				maze[y][x + 1] = '*';
				break;
			case 2:
				if (!points.isEmpty()) {
					t = r.nextInt(15)+1;
					Point p = points.lastElement();
					int lastT = (int) p.getT();
					t += lastT;
				} else {
					t = 0;
				}
				points.addElement(new Point(x, y+1, t));
				maze[y + 1][x] = '*';
				break;
			case 3:
				if (!points.isEmpty()) {
					t = r.nextInt(15)+1;
					Point p = points.lastElement();
					int lastT = (int) p.getT();
					t += lastT;
				} else {
					t = 0;
				}
				points.addElement(new Point(x-1, y, t));
				maze[y][x - 1] = '*';
				break;
			}
		}
		return ok;
	}

	private static void solveMaze(char[][] maze, Point begin, Point end) {
		solveMazeRecursively (maze, (int) end.getY(), (int) end.getX(), (int) begin.getY(), (int) begin.getX(), -1);
	}

	private static Vector<Point> solveCinematica(Vector<Point> points) {
		for (int i = 1; i < points.size(); i++) {
			Point p1 = points.get(i-1);
			Point p2 = points.get(i);
			float deltaX = p2.getX() - p1.getX();
			float deltaY = p2.getY() - p1.getY();
			float deltaT = p2.getT() - p1.getT();
			float velocidade = (float) Math.sqrt((Math.pow(deltaY, 2))+(Math.pow(deltaX, 2)))/deltaT;
			float angulo;
			if (deltaX == 0) {
				if (deltaY > 0) {
					angulo = 90;
				} else {
					angulo = -90;
				}
			} else {
				angulo = (float) Math.toDegrees(Math.atan2(deltaY, deltaX));
			}
			
			p2.setV(velocidade);
			p2.setA(angulo);
		}
		
		return points;
	}
	
	private static void getMapPoints(char[][] maze) {
		mapPoints.addElement(new Point(0, 0, 0));
		mapPoints.addElement(new Point(maze[0].length-1, 0, 0));
		mapPoints.addElement(new Point(maze[0].length-1, 0, 0));
		mapPoints.addElement(new Point(maze[0].length-1, maze.length-1, 0));
		mapPoints.addElement(new Point(maze[0].length-1, maze.length-1, 0));
		mapPoints.addElement(new Point(0, maze.length-1, 0));
		mapPoints.addElement(new Point(0, maze.length-1, 0));
		mapPoints.addElement(new Point(0, 0, 0));
		
//		for (int i = 0; i < maze.length; i++) {
//			for (int j = 0; j < maze[i].length; j++) {
//				System.out.print(maze[i][j]);
//			}
//			System.out.println();
//		}
		
		for (int i = 0; i < maze.length-1; i+=2) {
			for (int j = 0; j < maze[i].length-1; j+=2) {
				if ((maze[i][j] == '+') && (maze[i+1][j] == '|')) {
					mapPoints.addElement(new Point(j, i, 0));
					mapPoints.addElement(new Point(j, i+2, 0));
//					System.out.println("de " + new Point(i, j, 0).toString());
//					System.out.println("para " + new Point(i+2, j, 0).toString());
				}
				if ((maze[i][j] == '+') && (maze[i][j+1] == '-')) {
					mapPoints.addElement(new Point(j, i, 0));
					mapPoints.addElement(new Point(j+2, i, 0));
//					System.out.println("de " + new Point(i, j, 0).toString());
//					System.out.println("para " + new Point(i, j+1, 0).toString());
				}
			}
		}
	}
	
	private static String[] fromMatrix(char[][] maze) {
		String[] lines = new String[maze.length];
		for (int i = 0; i < maze.length; i++) {
			StringBuilder sb = new StringBuilder();
			for (int j = 0; j < maze[i].length; j++)
				sb.append(maze[i][j]);
			lines[i] = sb.toString();
		}
		return lines;
	}

	private static Point searchBegin(char[][] maze) {
		for (int i = 0; i < maze.length; i++) {
			for (int j = 0; j < maze[i].length; j++) {
				if (maze[i][j] == 'C') {
					return new Point(i, j, 0);
				}
			}
		}
		return null;
	}

	private static Point searchEnd(char[][] maze) {
		for (int i = 0; i < maze.length; i++) {
			for (int j = 0; j < maze[i].length; j++) {
				if (maze[i][j] == 'F') {
					return new Point(i, j, 0);
				}
			}
		}
		return null;
	}

}
