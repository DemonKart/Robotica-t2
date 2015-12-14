public class Point {
	
	private float x;
	private float y;
	private float a;
	private float t;
	private float v;

	public float getA() {
		return a;
	}

	public void setA(float a) {
		this.a = a;
	}

	public float getT() {
		return t;
	}

	public void setT(float t) {
		this.t = t;
	}

	public float getV() {
		return v;
	}

	public void setV(float v) {
		this.v = v;
	}

	public Point(float x, float y, float t) {
		this.x = x;
		this.y = y;
		this.t = t;
		this.v = 0;
		this.a = 0;
	}
	
	public Point(String x, String y) {
		this.x = Float.parseFloat(x);
		this.y = Float.parseFloat(y);
		this.t = 0;
		this.v = 0;
		this.a = 0;
	}

	public float getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	@Override
	public String toString() {
		return "{\"x\":" + x*50 + ", \"y\":" + y*50 + ", \"a\":" + a + ", \"t\":" + t + ", \"v\":" + v + "}";
	}

}
